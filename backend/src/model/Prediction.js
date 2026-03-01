import mongoose from 'mongoose'

const prediction_Schema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User" , 
        required : true
    },
    study_hours: {
        type: Number,
    },
    attendance : {
        type: Number
    },
    mental_health: {
        type: Number
    },
    sleep_hours: {
        type: Number
    },
    part_time_job : {
        type: Number
    },
    predictedMarks: {
        type: Number
    }

},
{timestamps: true})

const Prediction = mongoose.model("Predict" , prediction_Schema)

export default Prediction