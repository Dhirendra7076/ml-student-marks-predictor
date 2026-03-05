import axios from "axios";
import { useState } from "react";
import  { toast } from 'react-hot-toast'
import { useNavigate } from "react-router";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";


function Register() {
    const [fullName , setFullName] = useState("")
    const [email , setEmail] = useState("")
    const [countryCode , setCountryCode] = useState("")
    const [phoneNumber , setPhoneNumber] = useState()
    const [password , setPassword] = useState("")
    const [loading , setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async(e)=> {
        e.preventDefault();
        setLoading(true)

        try {
            await axios.post("http://localhost:5000/api/auth/register", 
                {fullName,
                    email,
                    password,
                    phoneNumber: `+${countryCode}  ${phoneNumber}`,
                   

                },
                {withCredentials : true}
            )

            if(countryCode.length<1) {
                toast.error("Enter Country code")
                setLoading(false)                   //TO DO - MAKE IT SO THAT USER CAN'T EVEN TYPE MORE THAN 2, 10 DIGITS
                return;
            }
            if(phoneNumber.length!==10){
                toast.error("Phone number must be of 10 digits")
            }
            toast.success("Registration Successful!")
            navigate("/")
        } catch (error) {
            toast.error(error.reponse?.data?.message || "Registration Failed")
        }
        setLoading(false)
    }
 return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
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
  <input
    type="text"
    placeholder="Code"
    className="input input-bordered w-24"
    value={countryCode}
    maxLength={4}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, "");
      setCountryCode(value);
    }}
    required
  />

  {/* Phone Number */}
  <input
    type="text"
    placeholder="Phone Number"
    className="input input-bordered flex-1"
    value={phoneNumber}
    maxLength={10}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, "");
      setPhoneNumber(value);
    }}
    required
  />

</div>

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