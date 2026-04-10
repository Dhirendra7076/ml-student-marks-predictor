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
import { Toaster } from 'react-hot-toast'


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
     <div className='min-h-screen flex flex-col relative'>
        {/* Immersive Modern Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat opacity-25"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-base-300/80 to-base-100/95"></div>
        </div>
     
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
      <Toaster position="top-center" />
     </div>
    )
}

export default App