import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import {Toaster} from 'react-hot-toast'
import axios from 'axios'
import { AuthProvider } from './context/AuthContent.jsx'

axios.defaults.withCredentials = true

createRoot(document.getElementById('root')).render(
  
    
    <AuthProvider>
      <BrowserRouter>
      <App />
       <Toaster/>
      </BrowserRouter>
        
    </AuthProvider>
      
    
    
  
)
