import { Outlet } from "react-router-dom" //<!THIS MEANS WHERE pages will render/>
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

function DashboardLayout() {

  return (
    <div className="min-h-screen flex flex-col">

      <Navbar/>

      <div className="flex flex-1">

        <Sidebar/>

        <main className="flex-1 p-8">
          <Outlet/> 
        </main>

      </div>

    </div>
  )
}

export default DashboardLayout