import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        formData
      )

      localStorage.setItem(
        "token",
        response.data.access_token
      )

      navigate("/dashboard")

    } catch (error) {
      alert("Login failed")
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-xl w-96"
      >

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-slate-700"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 p-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  )
}

export default Login