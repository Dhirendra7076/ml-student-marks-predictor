import axios from "axios";
import Prediction from '../model/Prediction.js'

export const predictMarks = async (req , resp)=> {
    try {

        console.log("Body recieved" ,req.body)
        
        const {study_hours, attendance , mental_health , sleep_hours , part_time_job} = req.body;

        if(
         //   !study_hours || !attendance || !mental_health || !sleep_hours || !part_time_job //this while taking part_time_job: 0  !0=true so your validation thinks 0 means missing so instead the following is better since it checks only for missing values

         study_hours ===undefined||
         attendance === undefined||
         mental_health === undefined||
         sleep_hours ===undefined||
         part_time_job ===undefined
        ) return resp.status(400).json({message: "All fields are required"});

        //call python fastAPI
        const response = await axios.post("http://127.0.0.1:8000/predict" , {
            study_hours,
            attendance ,
            mental_health,
            sleep_hours,
            part_time_job
        });

        const predictedValue = response.data["Predicted Score"];

        //SAVE TO MONGO
        const savedPrediction = await Prediction.create({
            study_hours,
            attendance ,
            mental_health,
            sleep_hours,
            part_time_job,
            predictedMarks : predictedValue,
            user : req.user
        })

        console.log("Saved to DB:", savedPrediction)

        return resp.json({
            savedPrediction
        });

        
    } catch (error) {
        console.error(error.message)
        return resp.status(500).json({message: "Prediction failed"});
    }
}

export const gethistory  = async (req, resp) => {
        try {
            const history = await Prediction.find({user : req.user}).sort({createdAt:-1});
            console.log("history: " , history);
            return resp.json(history)
        } catch (error) {
            console.error("history error: " , error)
            return resp.status(500).json({message: "Internal server error"})
        }
}

export const deletehistory = async (req , resp) => {
    await Prediction.deleteMany({user: req.user})
    resp.json({message: "All history cleared"});
}