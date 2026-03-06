import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import {  User , History , LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContent";

function Navbar(){
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate();
    const {user, logout} = useAuth()

    // useEffect(()=>{
    //     axios.get("http://localhost:5000/api/auth/me" , {
    //         withCredentials : true
    //     })
    //     .then((res)=> {setUser(res.data)
    //         setLoading(false)
    // })
    //     .catch((err)=>{
    //         if(err.response?.status ===401){
    //             setUser(null)
    //             setLoading(false)
    //         }else {
    //             console.error(err)
    //         }
    //     });
    // },[])

    const handleLogout = async()=> {
        await logout()
        navigate('/login')
    }

    console.log("Navbar rendered")

    return (
    <div className="navbar bg-base-100 shadow-md px-6">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">
          🎓 Marks Predictor
        </Link>
      </div>

      <div className="flex gap-4 items-center">

        {user ? (
          <>
            <span className="flex items-center gap-1 text-sm">
              <User size={16} />
              {user.fullName}
            </span>

            <Link
              to="/history"
              className="btn btn-sm btn-outline flex items-center gap-1"
            >
              <History size={16} />
              History
            </Link>

            <button
              onClick={handleLogout}
              className="btn btn-sm btn-error flex items-center gap-1"
            >
              <LogOut size={16} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm btn-outline">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm btn-primary">
              Register
            </Link>
          </>
        )}

      </div>
    </div>
  );
}

export default Navbar