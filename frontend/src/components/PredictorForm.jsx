import { useState } from "react";
import axios from "axios";
import { BarChart } from "lucide-react";
import toast from 'react-hot-toast'

function PredictorForm() {
    const [hours , setHours] = useState("")
    const [result , setResult] = useState(null)
    const [loading  ,setLoading] = useState(false);

    const handlePredict = async(e)=> {
        e.preventDeault();
        setLoading(true);
    
        try {
            const res = await axios.post("http://127.0.0.1:8000" , {
                hours : Number(hours),
            })

            setResult(res.data.predicted_marks)
            toast.success("Prediction Successfull");
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
            placeholder="Enter study hours"
            className="input input-bordered w-full"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            required
          />

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