import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Sample data
data = [
    {"serviceType": 0, "city": "delhi", "time": 10, "price": 600},
    {"serviceType": 1, "city": "mumbai", "time": 14, "price": 900},
    {"serviceType": 2, "city": "delhi", "time": 9, "price": 500},
    {"serviceType": 3, "city": "bangalore", "time": 16, "price": 1800},
    {"serviceType": 4, "city": "mumbai", "time": 11, "price": 700},
    {"serviceType": 5, "city": "bangalore", "time": 15, "price": 1400},
    {"serviceType": 6, "city": "delhi", "time": 8, "price": 450},
    {"serviceType": 7, "city": "mumbai", "time": 10, "price": 850},
    {"serviceType": 8, "city": "bangalore", "time": 13, "price": 1500},
    {"serviceType": 9, "city": "mumbai", "time": 12, "price": 950},
    {"serviceType": 10, "city": "delhi", "time": 11, "price": 1200},
    {"serviceType": 11, "city": "bangalore", "time": 14, "price": 1100},
    {"serviceType": 12, "city": "mumbai", "time": 9, "price": 1300},
    {"serviceType": 13, "city": "delhi", "time": 12, "price": 1150},
    {"serviceType": 0, "city": "mumbai", "time": 10, "price": 650},
    {"serviceType": 5, "city": "bangalore", "time": 11, "price": 1350},
    {"serviceType": 1, "city": "bangalore", "time": 12, "price": 800},
    {"serviceType": 2, "city": "delhi", "time": 14, "price": 900},
    {"serviceType": 3, "city": "mumbai", "time": 15, "price": 1600},
    {"serviceType": 4, "city": "indore", "time": 10, "price": 850},
]

# Convert to DataFrame
df = pd.DataFrame(data)

# City mapping
city_mapping = {
    "delhi": 0,
    "mumbai": 1,
    "bangalore": 2,
    "hyderabad": 3,
    "chennai": 4,
    "kolkata": 5,
    "pune": 6,
    "ahmedabad": 7,
    "jaipur": 8,
    "lucknow": 9,
    "indore": 10,
}
df["city_code"] = df["city"].str.lower().map(city_mapping)

# Features and label
X = df[["serviceType", "city_code", "time"]]
y = df["price"]

# Train model
model = LinearRegression()
model.fit(X, y)

# Save model
joblib.dump(model, "price_model.pkl")
