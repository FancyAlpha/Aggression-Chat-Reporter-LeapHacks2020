from os import listdir
import pickle
import joblib
import numpy as np

models = []
for file in listdir('models'):
    models.append(joblib.load('models/' + str(file)))
    print(file)
r_values = np.load('models/r_values.npy')

# print(models)


