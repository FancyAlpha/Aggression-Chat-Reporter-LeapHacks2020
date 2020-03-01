# -*- coding: utf-8 -*-
from os import listdir
import pickle
import joblib
import numpy as np
import sklearn
import pandas as pd, numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
import re, string


# URL = "http://aggression-detector.herokuapp.com/comments"
#
# r = requests.get(URL)
#
# text = ""

# train = pd.read_csv('comment-data/train.csv')
def classify (text):
    label_cols = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']

    test = pd.DataFrame()
    test['comment_text'] = [text]

    models = []
    for file in listdir('models'):
        if (file == '.DS_Store'):
            continue
        print(file)
        models.append(joblib.load('models/' + file))
    r_values = np.load('r_values.npy')
    print(r_values.shape)
    # print(np.shape(models))

    # print(r_values)
    # print(r_values.shape)
    # print(models)

    test['comment_text'].fillna("unknown", inplace=True)
    re_tok = re.compile(r'([“”¨«»®´·º½¾¿¡§£₤‘’])')

    def tokenize(s):
      return re_tok.sub(r' \1 ', s.strip(string.punctuation)).split()

    # n = train.shape[0]
    vec = TfidfVectorizer(ngram_range=(1,2), tokenizer=tokenize,
                   min_df=3, max_df=0.9, strip_accents='unicode', use_idf=1,
                   smooth_idf=1, sublinear_tf=1 )

    # train_term_doc = vec.fit_transform(train['comment_text']) # unused

    # joblib.dump(vec, 'vectorizer.joblib')

    # with open('vectorizer.pk', 'wb') as fin:
    #     pickle.dump(vec, fin)

    vec = joblib.load('vectorizer.joblib')

    print(test['comment_text'])
    test_term_doc = vec.transform(test['comment_text'])
    test_x = test_term_doc
    print(test_x.shape)
    # for i, j in enumerate(label_cols):
    #     print('fit', j)
    #     m,r = get_mdl(train[j])
    #     models.append(m)
    #     r_values.append(r)
    #     preds[:,i] = m.predict_proba(test_x.multiply(r))[:,1]


    preds = np.zeros((len(test), len(label_cols)))

    for i, j in enumerate(label_cols):
        print('fit', j)
        # m,r = get_mdl(train[j])
        m = models[i]
        r = r_values[i].reshape(1, len(r_values[i]))
        # models.append(m)
        # r_values.append(r)
        print(r.shape)
        multiplied_val = test_x.multiply(r)
        m.predict_proba(multiplied_val)
        print(multiplied_val.shape)
        preds[:,i] = m.predict_proba(test_x.multiply(r))[:,1]

    print(preds)
    preds = preds.flatten()
    for i in range (len(preds)):
        preds[i] = round(preds[i] + 0.3)
    print(preds)
    tags = [label_cols[i] for i in range(len(preds)) if preds[i] == 1]
    print(tags)
    severity = np.sum(preds)
    return tags, severity