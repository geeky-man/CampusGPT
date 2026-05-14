import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import Login from "./pages/auth/TempLogin.jsx"
import Register from "./pages/auth/TempRegister.jsx"

import Dashboard from "./pages/dashboard/Dashboard.jsx"
import UploadPage from "./pages/dashboard/UploadPage.jsx"
import ChatPage from "./pages/dashboard/ChatPage.jsx"

import DashboardLayout from "./layouts/DashboardLayout.jsx"

import ProtectedRoute from "./routes/ProtectedRoute.jsx"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/"
          element={<Navigate to="/chat" />}
        />

        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/upload"
            element={<UploadPage />}
          />

          <Route
            path="/chat"
            element={<ChatPage />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App