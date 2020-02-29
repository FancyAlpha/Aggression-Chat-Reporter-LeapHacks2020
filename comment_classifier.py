# -*- coding: utf-8 -*-
import pandas as pd, numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
import re, string

train = pd.read_csv('comment-data/train.csv')
test = pd.read_csv('comment-data/test.csv')
# subm = pd.read_csv('../input/sample_submission.csv')

# print(train.head())

# train = pd.read_csv(train_url)
train_validation_ratio = 0.6
# train = train.iloc[int(train_validation_ratio * len(train)):]
# test = pd.read_csv(test_url)
# test = train.iloc[:int(train_validation_ratio * len(train))]
test = pd.DataFrame()
test['comment_text'] = ["you're not as stupid as you look"]
# subm = pd.read_csv(subm_url)

label_cols = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']
train['none'] = 1-train[label_cols].max(axis=1)
print(train.describe())

train['comment_text'].fillna("unknown", inplace=True)
test['comment_text'].fillna("unknown", inplace=True)

re_tok = re.compile(r'([“”¨«»®´·º½¾¿¡§£₤‘’])')

def tokenize(s):
  return re_tok.sub(r' \1 ', s.strip(string.punctuation)).split()


n = train.shape[0]
vec = TfidfVectorizer(ngram_range=(1,2), tokenizer=tokenize,
               min_df=3, max_df=0.9, strip_accents='unicode', use_idf=1,
               smooth_idf=1, sublinear_tf=1 )
train_term_doc = vec.fit_transform(train['comment_text'])
test_term_doc = vec.transform(test['comment_text'])


def pr(y_i, y):
    p = x[y==y_i].sum(0)
    # print("p", p)
    return (p+1) / ((y==y_i).sum()+1)

x = train_term_doc
test_x = test_term_doc

def get_mdl(y):
    y = y.values
    # print("y", y)
    r = np.log(pr(1,y) / pr(0,y))
    # print("r", r)
    m = LogisticRegression(C=4, dual=True, solver='liblinear', max_iter=300)
    x_nb = x.multiply(r)
    return m.fit(x_nb, y), r

preds = np.zeros((len(test), len(label_cols)))
models = []
r_values = []
for i, j in enumerate(label_cols):
    print('fit', j)
    m,r = get_mdl(train[j])
    models.append(m)
    r_values.append(r)
    preds[:,i] = m.predict_proba(test_x.multiply(r))[:,1]

import pickle
import csv
# from google.colab import files
import joblib

print(type(models))
for i in range(len(label_cols)):
  joblib.dump(models[i], 'models/' + str(label_cols[i]) + '_model.joblib')
  # files.download(str(label_cols[i]) + '_model.joblib')
print(np.shape(np.asarray(r_values).reshape(6, 435376)))
r_values = np.asarray(r_values).reshape(6, 435376)

np.save('models/r_values.npy', r_values)
test_arr = np.load('r_values.npy')
# files.download('r_values.npy')
print(test_arr.shape)

