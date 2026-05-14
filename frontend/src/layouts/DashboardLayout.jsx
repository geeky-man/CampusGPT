import { Link, Outlet, useNavigate } from "react-router-dom"

function DashboardLayout() {

  const navigate = useNavigate()

  const handleLogout = () => {

    localStorage.removeItem("token")

    navigate("/login")
  }

  return (

    <div className="h-screen flex bg-slate-950 text-white">

      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col">

        <div className="p-6 border-b border-slate-800">

          <h1 className="text-3xl font-bold text-blue-400">
            CampusGPT
          </h1>

          <p className="text-slate-400 mt-2 text-sm">
            Intelligent College Assistant
          </p>

        </div>

        <nav className="flex-1 p-4 space-y-3">

          <Link
            to="/chat"
            className="block bg-slate-800 hover:bg-slate-700 transition-all p-4 rounded-xl"
          >
            💬 Chat
          </Link>

          <Link
            to="/upload"
            className="block bg-slate-800 hover:bg-slate-700 transition-all p-4 rounded-xl"
          >
            📄 Upload Documents
          </Link>

          <Link
            to="/dashboard"
            className="block bg-slate-800 hover:bg-slate-700 transition-all p-4 rounded-xl"
          >
            📊 Dashboard
          </Link>

        </nav>

        <div className="p-4 border-t border-slate-800">

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 transition-all p-4 rounded-xl"
          >
            Logout
          </button>

        </div>

      </aside>

      <main className="flex-1 overflow-y-auto">

        <Outlet />

      </main>

    </div>
  )
}

export default DashboardLayout