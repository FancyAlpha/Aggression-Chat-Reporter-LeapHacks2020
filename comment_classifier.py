# -*- coding: utf-8 -*-
import pandas as pd, numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
import re, string

train = pd.read_csv('comment-data/train.csv')
test = pd.read_csv('comment-data/test.csv')
# subm = pd.read_csv('../input/sample_submission.csv')

# print(train.head())

label_cols = ['toxic', 'severe_toxic', 'obscene', 'threat', 'insult', 'identity_hate']
train['none'] = 1-train[label_cols].max(axis=1)
print(train.describe())


train['comment_text'].fillna("unknown", inplace=True)
test['comment_text'].fillna("unknown", inplace=True)

# for char in "“”¨«»®´·º½¾¿¡§£₤‘’":
#         if char == "\xe2":
#             print (char)

# re_tok = re.compile(f'([{string.punctuation}“”¨«»®´·º½¾¿¡§£₤‘’])') # f instead of r?

# re_tok = re.compile(r'(['!\&quot#$%&'()*+, -./:;<=>?@[\]^_`{|}~'“”¨«»®´·º½¾¿¡§£₤‘’])')

re_tok = re.compile(r'([“”¨«»®´·º½¾¿¡§£₤‘’])')

def tokenize(s): return re_tok.sub(r' \1 ', s.strip(string.punctuation)).split()

n = train.shape[0]
vec = TfidfVectorizer(ngram_range=(1,2), tokenizer=tokenize,
               min_df=3, max_df=0.9, strip_accents='unicode', use_idf=1,
               smooth_idf=1, sublinear_tf=1 )
trn_term_doc = vec.fit_transform(train['comment_text'])
test_term_doc = vec.transform(test['comment_text'])

