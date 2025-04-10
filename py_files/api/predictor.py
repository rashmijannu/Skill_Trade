from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# Load model
model = joblib.load("../train_modal/price_model.pkl")

# Input schema
class InputData(BaseModel):
    serviceType: int
    city: int
    time: int

@app.post("/predict")
def predict_price(data: InputData):
    input_array = np.array([[data.serviceType, data.city, data.time]])
    prediction = model.predict(input_array)
    return {"predictedprice": int(prediction[0])}
