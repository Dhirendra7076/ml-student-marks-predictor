import axios from 'axios'
import { useState } from 'react'
import PredictorForm from './components/PredictorForm.jsx'
import { Routes,Route } from 'react-router-dom'
import { Home } from 'lucide-react'

function App() {
  
  return (
     <div data-theme = "dark"
     className='relative min-h-screen flex items-center justify-center'>
      <div className='absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background: radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]'/> 
      <Routes>
        <Route path = "/" element = {<PredictorForm/>}/>
        <Route path = "/home" element = {<Home/>}/>
      </Routes>
    </div>
    )
}

export default App