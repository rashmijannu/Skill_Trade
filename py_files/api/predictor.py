from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI()

# Load model
model = joblib.load(os.path.join(os.path.dirname(__file__), '..', 'train_modal', 'price_model.pkl'))

# Input schema
class InputData(BaseModel):
    serviceType: int
    city: str 
    time: int

@app.post("/predict")
def predict_price(data: InputData):
    input_array = [[data.serviceType, data.city, data.time]]  
    prediction = model.predict(input_array)
    return {"predictedprice": max(int(prediction[0]), 0)} 