import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart } from "lucide-react";
import toast from 'react-hot-toast'
import { Link } from "react-router-dom";
import PredictionChart from "./PredictionCharts";



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

    const chartData = [
      {studyHours : 1 , marks : 40},
      {studyHours : 2 , marks : 48},
      {studyHours : 3 , marks : 55},
      {studyHours :4 , marks : 63},
      {studyHours : 5 , marks : 72},
      {studyHours : 6 , marks : 80}
    ]

    useEffect(()=> {
        localStorage.setItem("predictionHistory" , JSON.stringify(history));
    } , [history])

    const handlePredict = async(e)=> {
        e.preventDefault();
        setLoading(true);

        

    
        try {
          const ML_API = import.meta.env.VITE_ML_API || "http://localhost:8000";
            const res = await axios.post(`${ML_API}/predict`, {
                study_hours : Number(studyHours),
                attendance : Number(attendance),
                mental_health : Number(mentalHealth),
                sleep_hours : Number(sleepHours),
                part_time_job : Number(partTimeJob)

            })
           
            const predictedValue = res.data["Predicted Score"]

            if (predictedValue === undefined) {
               throw new Error("Invalid response from server: 'Predicted Score' not found.");
            }

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
            console.error("Prediction Error:", error);
            toast.error(error.message || "Backend not running!");
        } finally {
            setLoading(false);
        }
           
    }

    return (
        <div className="card w-full max-w-md mx-auto bg-base-100 shadow-xl transition-all duration-300 hover:scale-105">
  <div className="card-body">

    <h2 className="card-title justify-center text-2xl">
      <BarChart className="mr-2" />
      Student Marks Predictor
    </h2>

   <div className="grid grid-cols-3 gap-6 mb-8">

  <div className="card bg-base-200 shadow-md p-4">
    <h2 className="text-sm opacity-70">Total Predictions</h2>
    <p className="text-2xl font-bold">42</p>
  </div>

  <div className="card bg-base-200 shadow-md p-4">
    <h2 className="text-sm opacity-70">Average Marks</h2>
    <p className="text-2xl font-bold">78</p>
  </div>

  <div className="card bg-base-200 shadow-md p-4">
    <h2 className="text-sm opacity-70">Best Prediction</h2>
    <p className="text-2xl font-bold">92</p>
  </div>

</div>

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
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading && <span className="loading loading-spinner"></span>}
        {loading ? "Predicting..." : "Predict Marks"}
      </button>
    </form>


    <PredictionChart data={chartData}/>

    {result !== null && result !== undefined && (
      <div className="alert alert-success mt-4">
        🎯 Predicted Marks: <strong>{typeof result === 'number' ? result.toFixed(2) : Number(result).toFixed(2)}</strong>
      </div>
    )}

    </div>
</div>
    )
}


export default PredictorForm