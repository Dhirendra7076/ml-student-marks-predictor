import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom"

function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="min-h-screen flex flex-col">

      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />

      <div className="flex flex-1">

        <Sidebar isOpen={isOpen} />

        <main className="flex-1 p-6 transition-all duration-300">
          <Outlet/>
        </main>

      </div>
    </div>
  )
}

export default DashboardLayout