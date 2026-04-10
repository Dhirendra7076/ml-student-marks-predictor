import axios from "axios";
import { useState } from "react";
import  { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { UserPlus , EyeIcon , EyeClosedIcon} from "lucide-react";
import { Link } from "react-router-dom";
import zxcvbn from 'zxcvbn'


function Register() {
    const [fullName , setFullName] = useState("")
    const [email , setEmail] = useState("")
    const [countryCode , setCountryCode] = useState("")
    const [phoneNumber , setPhoneNumber] = useState("")
    const [password , setPassword] = useState("")
    const [loading , setLoading] = useState(false);
    const [showPassword , setShowPassword] = useState(false);
    const [passwordStrength , setPasswordStrength]= useState(0);
    const [errors , setErrors] = useState({})


    const navigate = useNavigate();

    const validate = ()=>{
      const newErrors = {}

      if(!fullName.trim()){
        newErrors.fullName = "Full Name Required"

      }
      if(!email.includes("@"))
        newErrors.email = "Invalid email"

      if(phoneNumber.length!==10)
        newErrors.phoneNumber = "Phone number must be 10 digits"

      if(password.length<8)
        newErrors.password = "Password must be atleast 8 characters"

      setErrors(newErrors)

      return Object.keys(newErrors).length===0
    }

    const handleRegister = async(e)=> {
        e.preventDefault();
        if(!validate()) 
          return ;
        setLoading(true)

        if(countryCode.length<1) {
                toast.error("Enter Country code")
                setLoading(false)                   //TO DO - MAKE IT SO THAT USER CAN'T EVEN TYPE MORE THAN 2, 10 DIGITS
                return;
            }
            if(phoneNumber.length!==10){
                toast.error("Phone number must be of 10 digits")
            }

            
        try {
            const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
            await axios.post(`${API}/api/auth/register`, 
                {fullName,
                    email,
                    password,
                    phoneNumber: `+${countryCode}${phoneNumber}`,
                   

                },
                {withCredentials : true}
            )

            
            toast.success("Registration Successful!")
            navigate("/")
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration Failed")
        }
        setLoading(false)
    }
 return (
    <div className="flex items-center justify-center min-h-[85vh] px-4">
      <div className="w-full max-w-lg backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-8">
        <div className="card-body">

          <h2 className="card-title justify-center text-2xl">
            <UserPlus className="mr-2" />
            Register
          </h2>

          <form onSubmit={handleRegister} className="space-y-4 mt-4">

            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="flex gap-2">

  {/* Country Code */}
  <div className="flex gap-3">

  <input
    type="text"
    placeholder="+91"
    className="input input-bordered w-24"
    value={countryCode}
    maxLength={4}
    onChange={(e)=>{
      const value = e.target.value.replace(/\D/g,"");
      setCountryCode(value);
    }}
  />

  <input
    type="text"
    placeholder="Phone number"
    className="input input-bordered flex-1"
    value={phoneNumber}
    maxLength={10}
    onChange={(e)=>{
      const value = e.target.value.replace(/\D/g,"");
      setPhoneNumber(value);
    }}
  />

</div>  

</div>

           <div className="relative">
            <input 
            type = {showPassword? "text" : "password"}
            className="input input-bordered w-full pr-10"
            placeholder="Password"
            value={password}
            onChange={(e)=> {
              const value = e.target.value
              setPassword(value)

              const result= zxcvbn(value)
              setPasswordStrength(result.score)
            }}
            required
            />

            <div className="w-full mt-2">
  <progress 
    className={`progress w-full 
      ${passwordStrength === 0 && "progress-error"}
      ${passwordStrength === 1 && "progress-error"}
      ${passwordStrength === 2 && "progress-warning"}
      ${passwordStrength === 3 && "progress-info"}
      ${passwordStrength === 4 && "progress-success"}
    `}
    value={passwordStrength}
    max="4"
  ></progress>

  <p className="text-xs mt-1 text-gray-400">
    {["Very Weak","Weak","Okay","Strong","Very Strong"][passwordStrength]}
  </p>
</div>

            <button
            type="button"
            onClick={()=>setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword? <EyeIcon size = {12}/> : <EyeClosedIcon size={12}/>}
            </button>
           </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
            >
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;