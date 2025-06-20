import React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import renukut from "../assets/renukut.jpg"
import hindalcoLogo from "../assets/hindalco-logo.png"
import { Eye, EyeOff } from "lucide-react"

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "operator",
    department: "Rolling Mill",
    phone: "",
  })
  const [loading, setLoading] = useState(false)

  const { login, register, user } = useAuth()
  const navigate = useNavigate()

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      console.log("User found, redirecting to dashboard:", user)
      navigate("/", { replace: true })
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      let result
      if (isLogin) {
        console.log("Attempting login with:", formData.email)
        result = await login(formData.email, formData.password)
      } else {
        console.log("Attempting registration with:", formData.email)
        result = await register(formData)
      }

      console.log("Authentication result:", result)

      if (result.success) {
        console.log("Authentication successful, user should be set in context")
      } else {
        console.log("Authentication failed:", result.message)
      }
    } catch (error) {
      console.error("Authentication error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Don't render if user is already logged in
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${renukut})` }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-60 backdrop-blur-md rounded-lg shadow-lg p-8 pl-10 pr-10">
        <div className="flex justify-center mb-4">
          <img src={hindalcoLogo || "/placeholder.svg"} alt="Hindalco" className="h-16 w-17" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-900">Industrial Maintenance & Safety Portal</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? "Sign in to your account" : "Create a new account"}
        </p>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="input"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="input pr-10"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {!isLogin && (
            <>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select id="role" name="role" className="select" value={formData.role} onChange={handleChange}>
                  <option value="operator">Operator</option>
                  <option value="maintenance_engineer">Maintenance Engineer</option>
                  <option value="safety_officer">Safety Officer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  className="select"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="Rolling Mill">Rolling Mill</option>
                  <option value="Smelting">Smelting</option>
                  <option value="Casting">Casting</option>
                  <option value="Quality Control">Quality Control</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="input"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div>
            <button type="submit" disabled={loading} className="w-full btn btn-primary disabled:opacity-50">
              {loading ? "Please wait..." : isLogin ? "Sign in" : "Sign up"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-700"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
