import PredictorForm from "../components/PredictorForm";
import { Toaster } from "react-hot-toast";

function Home()  {
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <Toaster position="top-right" />
      <PredictorForm />
    </div>
    )
}

export default Home