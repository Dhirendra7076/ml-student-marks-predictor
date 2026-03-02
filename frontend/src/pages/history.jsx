import { useEffect, useState } from "react";
import { ArrowLeft , Trash, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";


function HistoryPage() {
    const [history , setHistory] = useState([]);

    useEffect(()=> {
        const saved = localStorage.getItem("predictionHistory")
        if(saved) {
            setHistory(JSON.parse(saved))
        }
    }, [])

    const deleteOne = (indexToDelete)=> {
        const updated = history.filter((_, index) => index !== indexToDelete)
        setHistory(updated);
        localStorage.setItem("predictionHistory" , JSON.stringify(updated)); //TO DO : WHAT IT DOES
    }

    const deleteAll = ()=> {
        setHistory([]);
        localStorage.removeItem("predictionHistory")
    }

    return (
    <div className="min-h-screen p-8 bg-base-200">
      <h1 className="text-3xl font-bold mb-6">Prediction History</h1>
      <Link 
            to = "/"
            className="btn btn-outline btn-sm mb-4 flex items-center gap-2"
        >
            <ArrowLeft size={16}/>
            Back to Predictor
        </Link>

      {history.length === 0 ? (
        <p>No predictions yet.</p>
      ) : (
        <div className="space-y-4">
            {history.length > 0 && (
                <button 
                    onClick={deleteAll}
                    className="btn btn-error btn-sm mb-4 flex items-center gap-2"
                >
                    <Trash2 size = {16}/>
                    Delete All
                </button>
            )}
          {history.map((item, index) => (
           <div key={index} className="card bg-base-100 shadow-md p-4 relative">

            <button 
                onClick={()=> deleteOne(index)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
                <Trash2 size ={12} />
            </button>

             <p>📅 {new Date(item.timestamp).toLocaleString()}</p>
            <p>📚 Study: {item.studyHours}h</p>
            <p>📊 Attendance: {item.attendance}%</p>
            <p>😴 Sleep: {item.sleepHours}h</p>
            <p>🧠 Mental Health: {item.mentalHealth}</p>
            <p>
              🎯 Score: <strong>{item.predicted.toFixed(2)}</strong>
             </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryPage