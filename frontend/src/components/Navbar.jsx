
import {  useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import { Menu, User ,  LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContent";

function Navbar({toggleSidebar}){
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

    return (
    <div className="navbar bg-base-100 shadow-md px-6">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3 flex-1">

        {/* Hamburger */}
        <button
          onClick={toggleSidebar}
          className="btn btn-ghost btn-sm"
        >
          <Menu size={20} />
        </button>

        {/* Logo */}
        <Link to="/" className="text-lg font-bold">
          🎓 Marks Predictor
        </Link>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {user ? (
          <>
            <span className="flex items-center gap-2 text-sm opacity-80">
              <User size={16} />
              {user.fullName}
            </span>

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
  )
}

export default Navbar