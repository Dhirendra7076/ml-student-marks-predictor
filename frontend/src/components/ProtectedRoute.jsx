import { useAuth } from "../context/AuthContent";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}){
    const {user , loading} = useAuth()

    if(loading)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
        
        if(!user)
            return <Navigate to= "/login" replace />

        return children
}

export default ProtectedRoute