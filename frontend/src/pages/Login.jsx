import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
//import { login } from "../../../backend/src/controllers/auth.controllers";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";


function Login(){
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [loading , setLoading] = useState(false);

    const navigate = useNavigate()

    const handleLogin = async(e)=>{
        e.preventDefault();
        setLoading(true)

        try {
            await axios.post("http://localhost:5000/api/auth/login" , 
                {email , password},
                {withCredentials : true}
            )

            toast.success("Login Successful")
            navigate('/')
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed")
        }
        
        setLoading(false);
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">

          <h2 className="card-title justify-center text-2xl">
            <LogIn className="mr-2" />
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4 mt-4">

            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>
          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold">
             Register
               </Link>
            </p>

        </div>
      </div>
    </div>
  );
}

export default Login