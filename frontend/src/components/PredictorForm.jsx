import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart } from "lucide-react";
import toast from 'react-hot-toast'
import { Link } from "react-router-dom";



function PredictorForm() {
    const [studyHours , setStudyHours] = useState("")
    const [attendance , setAttendance] = useState("")
    const [mentalHealth  ,setMentalHealth] = useState("");
    const [sleepHours , setSleepHours] = useState("")
    const [partTimeJob , setPartTimeJob] = useState("0")
    const [loading , setLoading] = useState(false);
    const [history , setHistory] = useState(()=> {
        const saved = localStorage.getItem("predictionHistory");
        return saved ? JSON.parse(saved): [];
    })
    const [result , setResult] = useState(null)

    useEffect(()=> {
        localStorage.setItem("predictionHistory" , JSON.stringify(history));
    } , [history])

    const handlePredict = async(e)=> {
        e.preventDefault();
        setLoading(true);
    
        try {
            const res = await axios.post("http://127.0.0.1:8000/predict" , {
                study_hours : Number(studyHours),
                attendance : Number(attendance),
                mental_health : Number(mentalHealth),
                sleep_hours : Number(sleepHours),
                part_time_job : Number(partTimeJob)

            })
           
            const predictedValue = res.data["Predicted Score"]

            const newEntry = {
                studyHours : Number(studyHours),
                attendance : Number(attendance) , 
                mentalHealth : Number(mentalHealth),
                partTimeJob : Number(partTimeJob),
                sleepHours : Number(sleepHours),
                predicted : predictedValue,
                timestamp : new Date().toISOString(), //add timestamp
            }
            setResult(predictedValue)
            //in order
            setHistory((prev)=> [newEntry, ...prev]) //TO DO : LATER ADD SORTING OPTIONS

            toast.success("Prediction Successful!")
        } catch (error) {
            toast.error("Backend not running!")
        }
        setLoading(false)
           
    }

    return (
        <div className="card w-full max-w-md bg-base-100 shadow-xl transition-all duration-300 hover:scale-105">
  <div className="card-body">

    <h2 className="card-title justify-center text-2xl">
      <BarChart className="mr-2" />
      Student Marks Predictor
    </h2>

   

    <form onSubmit={handlePredict} className="space-y-4 mt-4">
      <input
        type="number"
        min = "0"
        max = "12"
        step = "0.5"
        inputMode = "numeric"
        onKeyDown={(e)=> {
            if(["e" , "E" , "+" , "-" ].includes(e.key)) {
                e.preventDefault();
            }
        }}
        placeholder="Enter study hours"
        className="input input-bordered w-full"
        value={studyHours}
        onChange={(e) => {
            //const value = Math.min(0 , Math.max(0 , e.target.value)) //doesnt let  us put value even by pasting  , can do in others if want 
            setStudyHours(e.target.value)
        }
        }
        required
      />
      <input 
      type = "number"
      min="0"
      max="100"
      inputMode="numeric"
      onKeyDown={(e)=> {
        if(["e" , "E" , "+" , "-"].includes(e.key)) {
            e.preventDefault();
        }
      }}
      
      placeholder="Attendance %"
      className="input input-bordered w-full"
      value={attendance}
      onChange={(e) => setAttendance(e.target.value)}
      required
      />

      <input 
      type = "number"
      min="0"
      max="12"
      inputMode="numeric"
      pattern="[0-9]"
      onKeyDown={(e)=> {
        if(["e" , "E" , "+" , "-"].includes(e.key)) {
            e.preventDefault();
        }
      }}
      placeholder="Sleep hours"
      className="input input-bordered w-full"
      value={sleepHours}
      onChange={(e) => setSleepHours(e.target.value)}
      required
      />

      <input 
      type = "number"
      min="0"
      max="10"
      inputMode="numeric"
      pattern="[0-9]"
      onKeyDown={(e)=> {
        if(["e" , "E" , "+" , "-"].includes(e.key)) {
            e.preventDefault();
        }
      }}
      placeholder="Mental health"
      className="input input-bordered w-full"
      value={mentalHealth}
      onChange={(e) => setMentalHealth(e.target.value)}
      required
      />

      <select
        className="select select-bordered w-full"
        value={partTimeJob}
        onChange={(e) => setPartTimeJob(e.target.value)}
        >
            <option value={"0"}>No Part-time job</option>
            <option value={"1"}>Yes Part-time job</option>
        </select>


      <button
        type="submit"
        className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
      >
        {loading ? "Predicting..." : "Predict Marks"}
      </button>
    </form>

    {result !== null && (
      <div className="alert alert-success mt-4">
        🎯 Predicted Marks: <strong>{result.toFixed(2)}</strong>
      </div>
    )}

    </div>
</div>
    )
}


export default PredictorForm