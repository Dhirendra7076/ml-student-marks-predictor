import PredictorForm from './components/PredictorForm.jsx'
import { Routes,Route } from 'react-router-dom'
import { Home ,} from 'lucide-react'
import HistoryPage from './pages/history.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/register.jsx'
import Navbar from './components/Navbar.jsx'
import { useAuth } from './context/AuthContent.jsx'
import DashboardLayout from './Layout/DashboardLayout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'


function App() {

     const {loading} = useAuth()

     if(loading) 
          return (
               <div className='min-h-screen flex items-center justify-center'>
                    <span className='loading loading-spinner loading-lg'>
                         
                    </span>
               </div>
          )
  
  return (
     <div className='absolute inset-0 -z-10 
[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#00FF9D30_100%)]'>
     <div className='min-h-screen flex flex-col'>
     
     
      <Routes>
         <Route path = "/login" element = {<Login/>}/>
        <Route path = '/register' element = {<Register/>}/>

        <Route 
        element = {
          <ProtectedRoute>
               <DashboardLayout/>
          </ProtectedRoute>
        }
        >
        <Route path = "/" element = {<PredictorForm/>}/>
        <Route path = "/history" element = {<HistoryPage/>}/>
       
        </Route>
      </Routes>
     
     </div>
     </div>
    )
}

export default App