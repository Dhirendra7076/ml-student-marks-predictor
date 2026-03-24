import { Link } from "react-router-dom"
import { Home, History } from "lucide-react"
import { useState } from "react"



  function Sidebar() {
    const [isOpen , setIsOpenN] = useState(true)
  return (
    <div className="w-60 bg-base-200 border-r border-base-300 p-4">

      <ul className="menu text-base-content">

        <li>
          <Link to="/">Predictor</Link>
        </li>

        <li>
          <Link to="/history">History</Link>
        </li>

      </ul>

    </div>
  )
}


export default Sidebar