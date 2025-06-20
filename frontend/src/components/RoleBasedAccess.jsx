
import React from "react"
import { useAuth } from "../contexts/AuthContext"

const RoleBasedAccess = ({ allowedRoles, children, fallback = null }) => {
  const { user } = useAuth()

  if (!user || !allowedRoles.includes(user.role)) {
    return fallback
  }

  return children
}

export default RoleBasedAccess
