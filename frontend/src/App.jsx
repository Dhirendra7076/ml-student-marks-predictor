import PredictorForm from './components/PredictorForm.jsx'
import { Routes,Route } from 'react-router-dom'
import { Home ,} from 'lucide-react'
import HistoryPage from './pages/history.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/register.jsx'
import Navbar from './components/Navbar.jsx'


function App() {
  
  return (
     <>
     <div className='min-h-screen flex flex-col'>
     <Navbar/>

     <main className='flex-1 flex items-center justify-center relative'>
      <Routes>
        <Route path = "/" element = {
          
             <PredictorForm/>
        }/>
        <Route path = "/home" element = {<Home/>}/>
        <Route path = "/history" element = {
          
             <HistoryPage/>
          
         }/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = '/register' element = {<Register/>}/>
      </Routes>
     </main>
     </div>
     </>
    )
}

export default App