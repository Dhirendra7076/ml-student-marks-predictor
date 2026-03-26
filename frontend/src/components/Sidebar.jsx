import { Link } from "react-router-dom"

  function Sidebar({ isOpen }) {
  return (
    <div
      className={`
        fixed top-0 left-0 h-full w-60 
        bg-base-200 border-r border-base-300 p-4
        transform transition-transform duration-300 z-50
        ${isOpen && (
  <div
    className="fixed inset-0 bg-black/30 z-40"
    onClick={() => setIsOpen(false)}
  />
)}`}
    >
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