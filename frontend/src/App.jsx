import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Machines from "./pages/Machines"
import Tickets from "./pages/Tickets"
import Incidents from "./pages/Incidents"
import Maintenance from "./pages/Maintenance"
import Analytics from "./pages/Analytics"
import Profile from "./pages/Profile"
import LoadingSpinner from "./components/LoadingSpinner"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const { user, loading } = useAuth()

  if (loading) return <LoadingSpinner />
  if (!user) return <Login />

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        {/* Admin & Engineer */}
        <Route path="/machines" element={<ProtectedRoute element={<Machines />} allowedRoles={["admin", "maintenance_engineer"]} />} />
        
        {/* Admin & Operator */}
        <Route path="/tickets" element={<ProtectedRoute element={<Tickets />} allowedRoles={["admin", "operator"]} />} />
        
        {/* Admin & Safety */}
        <Route path="/incidents" element={<ProtectedRoute element={<Incidents />} allowedRoles={["admin", "safety_officer"]} />} />
        
        {/* Admin & Engineer */}
        <Route path="/maintenance" element={<ProtectedRoute element={<Maintenance />} allowedRoles={["admin", "maintenance_engineer"]} />} />
        
        {/* Admin only */}
        <Route path="/analytics" element={<ProtectedRoute element={<Analytics />} allowedRoles={["admin"]} />} />
        
        {/* All logged-in users */}
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
