// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { user } = useAuth()

  if (!user) return <Navigate to="/" replace />

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return element
}

export default ProtectedRoute
