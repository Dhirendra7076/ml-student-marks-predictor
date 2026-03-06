import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = ()=> useContext(AuthContext)

export const AuthProvider =({children})=> {
    const [user , setUser] = useState(null)
    const [loading , setLoading] = useState(true)

    const checkAuth = async()=> {
    try {
        const res = await axios.get("http://localhost:5000/api/auth/me" , {
            withCredentials: true
        })

        setUser(res.data)
    } catch (error) {
        if(error.response?.status===401 || error.response?.status ===400){
            setUser(null); //user simply not logged in
        }else{
            console.error("Auth Check Failed" , error)
        }
    
    }

    setLoading(false)
}


    useEffect(()=> {
    checkAuth()
}, [])

    const logout = async ()=> {
    await axios.post("http://localhost:5000/api/auth/logout" , {

    },
    {withCredentials: true}
)

    setUser(null)

    
}
return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );

}