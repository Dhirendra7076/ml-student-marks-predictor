import { useState } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom"

function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">

      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 relative">

        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        <main className={`flex-1 p-6 transition-all duration-300 w-full ${isOpen ? 'md:ml-60' : 'ml-0'}`}>
          <Outlet/>
        </main>

      </div>
    </div>
  )
}

export default DashboardLayout