import PredictorForm from './components/PredictorForm.jsx'
import { Routes,Route } from 'react-router-dom'
import { Home ,} from 'lucide-react'
import HistoryPage from './pages/history.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/register.jsx'
import Navbar from './components/Navbar.jsx'
import { useAuth } from './context/AuthContent.jsx'


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
     <Navbar/>

     <main className='flex-1 flex items-center justify-center relative'>
      <Routes>
        <Route path = "/" element = {<PredictorForm/>
        }/>
        <Route path = "/home" element = {<Home/>}/>
        <Route path = "/history" element = {<HistoryPage/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = '/register' element = {<Register/>}/>
      </Routes>
     </main>
     </div>
     </div>
    )
}

export default App