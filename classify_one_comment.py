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

train = pd.read_csv('comment-data/train.csv')

label_cols = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']

test = pd.DataFrame()
test['comment_text'] = ["you're not as stupid as you look"]

models = []
for file in listdir('models'):
    if (file == '.DS_Store'):
        continue
    print(file)
    models.append(joblib.load('models/' + file))
r_values = np.load('r_values.npy')


print(r_values)
print(r_values.shape)
# print(models)

test['comment_text'].fillna("unknown", inplace=True)
re_tok = re.compile(r'([“”¨«»®´·º½¾¿¡§£₤‘’])')

def tokenize(s):
  return re_tok.sub(r' \1 ', s.strip(string.punctuation)).split()

# n = train.shape[0]
vec = TfidfVectorizer(ngram_range=(1,2), tokenizer=tokenize,
               min_df=3, max_df=0.9, strip_accents='unicode', use_idf=1,
               smooth_idf=1, sublinear_tf=1 )

# train_term_doc = vec.fit_transform(train['comment_text'])

# joblib.dump(vec, 'vectorizer.joblib')

# with open('vectorizer.pk', 'wb') as fin:
#     pickle.dump(vec, fin)



print(test['comment_text'])
test_term_doc = vec.transform(test['comment_text'])
test_x = test_term_doc
# for i, j in enumerate(label_cols):
#     print('fit', j)
#     m,r = get_mdl(train[j])
#     models.append(m)
#     r_values.append(r)
#     preds[:,i] = m.predict_proba(test_x.multiply(r))[:,1]


preds = np.zeros((len(test), len(label_cols)))
models = []
r_values = []
for i, j in enumerate(label_cols):
    print('fit', j)
    # m,r = get_mdl(train[j])
    m = models[i]
    r = r_values[i].reshape(1, len(r_values[i]))
    models.append(m)
    r_values.append(r)
    preds[:,i] = m.predict_proba(test_x.multiply(r))[:,1]

print(preds)