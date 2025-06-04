import React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { mockUsers } from "../data/mockData"
import toast from "react-hot-toast"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("imsp_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const foundUser = mockUsers.find((u) => u.email === email && u.password === password)

      if (!foundUser) {
        toast.error("Invalid credentials")
        return { success: false, message: "Invalid credentials" }
      }

      const userSession = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        department: foundUser.department,
        phone: foundUser.phone,
      }

      setUser(userSession)
      localStorage.setItem("imsp_user", JSON.stringify(userSession))
      toast.success("Login successful!")
      return { success: true }
    } catch (error) {
      toast.error("Login failed")
      return { success: false, message: "Login failed" }
    }
  }

  const register = async (userData) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if user already exists
      const existingUser = mockUsers.find((u) => u.email === userData.email)
      if (existingUser) {
        toast.error("User already exists")
        return { success: false, message: "User already exists" }
      }

      const newUser = {
        id: String(mockUsers.length + 1),
        ...userData,
      }

      // Add to mock users (in real app, this would be sent to backend)
      mockUsers.push(newUser)

      const userSession = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        department: newUser.department,
        phone: newUser.phone,
      }

      setUser(userSession)
      localStorage.setItem("imsp_user", JSON.stringify(userSession))
      toast.success("Registration successful!")
      return { success: true }
    } catch (error) {
      toast.error("Registration failed")
      return { success: false, message: "Registration failed" }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("imsp_user")
    toast.success("Logged out successfully")
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
