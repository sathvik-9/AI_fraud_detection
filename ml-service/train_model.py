import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from imblearn.over_sampling import SMOTE
import joblib

df = pd.read_csv('data/creditcard.csv')

x = df.drop("Class", axis=1)
y = df["Class"]

smote = SMOTE(random_state=42)
x_resampled, y_resampled = smote.fit_resample(x, y)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(x_resampled, y_resampled)

joblib.dump(model, 'fraud_model.pkl')

print("Model trained and saved as fraud_model.pkl")