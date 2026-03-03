import axios from "axios";
import { useState , useEffect } from "react";
import { Navigate } from "react-router-dom";


function ProtectedRoute({children}){
    const [loading ,setLoading] = useState(true);
    const [isauthenticated , setIsauthenticated] = useState(false)

    useEffect(()=> {
        const checkAuth = async()=>{
            try {
                await axios.post("http://localhost:5000/api/auth/me" , { //ask use of children to cahtgpt
                    withCredentials : true //required for cookies
                });

                setIsauthenticated: true;

            } catch (error) {
                setIsauthenticated : false
            }

            setLoading : false
        }
        checkAuth();
    } , [])

    if(loading) {
        return <div className="text-center mt-10">Checking authentication...</div>
    }

    if(!isauthenticated) {
        return <Navigate to="/login" replace/>
    }
    return children
}

export default ProtectedRoute