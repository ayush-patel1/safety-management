import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import { Toaster } from "react-hot-toast"
import Layout from "./components/Layout"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Machines from "./pages/Machines"
import Tickets from "./pages/Tickets"
import Incidents from "./pages/Incidents"
import Maintenance from "./pages/Maintenance"
import Analytics from "./pages/Analytics"
import Profile from "./pages/Profile"
import Unauthorized from "./pages/Unauthorized"
import LoadingSpinner from "./components/LoadingSpinner"

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />

        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  {/* Dashboard - All roles */}
                  <Route path="/" element={<Dashboard />} />

                  {/* Machines - All roles */}
                  <Route path="/machines" element={<Machines />} />

                  {/* Tickets - All roles */}
                  <Route path="/tickets" element={<Tickets />} />

                  {/* Incidents - All roles */}
                  <Route path="/incidents" element={<Incidents />} />

                  {/* Maintenance - Engineers and Admins */}
                  <Route
                    path="/maintenance"
                    element={
                      <ProtectedRoute allowedRoles={["admin", "maintenance_engineer"]}>
                        <Maintenance />
                      </ProtectedRoute>
                    }
                  />

                  {/* Analytics - Admins and Safety Officers */}
                  <Route
                    path="/analytics"
                    element={
                      <ProtectedRoute allowedRoles={["admin", "safety_officer"]}>
                        <Analytics />
                      </ProtectedRoute>
                    }
                  />

                  {/* Profile - All roles */}
                  <Route path="/profile" element={<Profile />} />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </>
  )
}

export default App
