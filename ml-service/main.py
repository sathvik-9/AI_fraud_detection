from fastapi import FastAPI
import joblib
import numpy as np

app = FastAPI()
model = joblib.load('fraud_model.pkl')

@app.post("/predict")
def predict_fraud(transaction: dict):
    features = np.array(list(data.values())).reshape(1,-1)
    probability = model.predict_proba(features)[0][1]
    return {
        "risk_score": float(probability),
        "is_fraud": bool(probability > 0.5)
    }