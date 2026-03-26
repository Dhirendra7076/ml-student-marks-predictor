import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
//import { login } from "../../../backend/src/controllers/auth.controllers";
import { EyeClosed, EyeIcon, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContent";

function Login(){
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [loading , setLoading] = useState(false);
    const [showPassword , setShowPassword] = useState(false)

    const {setUser} = useAuth()

    const navigate = useNavigate()

    const handleLogin = async(e)=>{
        e.preventDefault();
        setLoading(true)

        try {
          const API = import.meta.env.VITE_API_URL;
           const res = await axios.post(`${API}/api/auth/login` , 
                {email , password},
                {withCredentials : true}
            )
            
            setUser(res.data.user)

            toast.success("Login Successful")
            navigate('/')
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed")
        }
        
        setLoading(false);
    }

    return (
      
<div className="min-h-[80vh] w-full flex items-center justify-center">

  <div className="w-full max-w-lg backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8">
    
      
        <div className="card-body">

          <div className="flex items-center justify-center gap-2 mb-6">
   <LogIn size={26} className="text-primary"/>
  <h2 className="text-2xl font-semibold tracking-wide">
    Login
  </h2>
</div>

          <form onSubmit={handleLogin} className="space-y-4 mt-4">

            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full bg-base-200/40 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    className="input input-bordered w-full pr-10 bg-base-200/40 focus:ring-2 focus:ring-primary transition-all"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-3 text-gray-400 hover:text-white transition"
  >
    {showPassword ? <EyeIcon size={12}/> : <EyeClosed size={12}/>}
  </button>
</div>

            <button
  type="submit"
  className={`btn w-full mt-2 bg-gradient-to-r from-indigo-500 to-purple-500 border-none text-white hover:opacity-90 transition ${
    loading ? "loading" : ""
  }`}
>
  {loading ? "Logging in..." : "Login"}
</button>

          </form>
          <p className="text-center mt-5 text-sm text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
             Register
               </Link>
            </p>

        </div>
      </div>
    </div>
  );
}

export default Login