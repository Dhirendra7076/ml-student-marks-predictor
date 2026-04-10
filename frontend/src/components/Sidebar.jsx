import { Link } from "react-router-dom"
import { Menu } from "lucide-react"

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      {/* Overlay for mobile or smaller screens when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-base-200 border-r border-base-300 p-4 transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={toggleSidebar} className="btn btn-ghost btn-sm">
            <Menu size={20} />
          </button>
        </div>

        <ul className="menu text-base-content">
          <li>
            <Link to="/">Predictor</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar