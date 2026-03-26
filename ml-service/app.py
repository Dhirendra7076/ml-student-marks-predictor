import warnings
from fastapi import FastAPI  #steamlit is used for frontend and fastapi is for creating api service 
import pandas as pd
import joblib
import numpy as np
warnings.filterwarnings("ignore")
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ml-student-marks-predictor.vercel.app",  #reason written in notebook
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_path = os.path.join(os.path.dirname(__file__), "best_model.pkl")
model = joblib.load(model_path)

# st.title("Student exam score predictor")

# study_hours = st.sidebar.slider("Study hours per day" , 0.0 , 12.0 , 2.0) #min_vlalue , max , base
# attendance = st.sidebar.slider("Attendance Percentage" , 0.0 , 100.0 , 80.0)
# mental_health = st.sidebar.slider("Mental health rating(1-10)" , 1 , 10 , 5)
# sleep_hours = st.sidebar.slider("Sleep" , 0.0 , 12.0 , 7.0)
# part_time_job = st.sidebar.selectbox("Part-time job" , ["No" , "Yes"])

# st.subheader("Input Summary")
# st.write({
#     "Study Hours" : study_hours,
#     "Attendance" : attendance,
#     "Mental health" : mental_health,
#     "Part-time Job" : part_time_job
# })

# ptj_encoded = 1 if part_time_job=="Yes" else 0

# if st.button("Predict Exam Score"): 

#     input_data = np.array([[study_hours,attendance,mental_health, sleep_hours,ptj_encoded]]) #should be in the order which you trained your model
#     prediction = model.predict(input_data)[0]

#     prediction = max(0 , min(100 , prediction))

#     st.success(f"Predicted exam score: {prediction:0.2f}")

#this whole is when streamlit was used for frontend before integration of mern 


@app.get("/")
def home():
    return {"message" : "Students Marks ML service running"}

@app.post("/predict")
def predict(data: dict):

    input_data = np.array([[
        data["study_hours"],
        data["attendance"],
        data["mental_health"],
        data["sleep_hours"],
        data["part_time_job"]
    ]])

    prediction = model.predict(input_data)[0]

    prediction = max(0,min(100 , prediction))

    return {
        "Predicted Score" : float(prediction)
    }