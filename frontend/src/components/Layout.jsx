import React from "react"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import RoleBasedAccess from "./RoleBasedAccess"
import { Menu, X, Home, Settings, AlertTriangle, Wrench, Calendar, BarChart3, User, LogOut, Bell } from "lucide-react"

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: Home,
      roles: ["admin", "maintenance_engineer", "safety_officer", "operator"],
    },
    {
      name: "Machines",
      href: "/machines",
      icon: Settings,
      roles: ["admin", "maintenance_engineer", "safety_officer", "operator"],
    },
    {
      name: "Tickets",
      href: "/tickets",
      icon: Wrench,
      roles: ["admin", "maintenance_engineer", "safety_officer", "operator"],
    },
    {
      name: "Incidents",
      href: "/incidents",
      icon: AlertTriangle,
      roles: ["admin", "maintenance_engineer", "safety_officer", "operator"],
    },
    {
      name: "Maintenance",
      href: "/maintenance",
      icon: Calendar,
      roles: ["admin", "maintenance_engineer"],
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      roles: ["admin", "safety_officer"],
    },
  ]

  const isActive = (href) => {
    return location.pathname === href
  }

  const filteredNavigation = navigation.filter((item) => item.roles.includes(user?.role))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-gray-900">IMSP</h1>
            <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {filteredNavigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? "bg-blue-100 text-blue-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex items-center h-16 px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">IMSP</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {filteredNavigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? "bg-blue-100 text-blue-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button onClick={() => setSidebarOpen(true)} className="text-gray-500 hover:text-gray-600 lg:hidden">
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              <RoleBasedAccess allowedRoles={["admin", "safety_officer"]}>
                <button className="text-gray-400 hover:text-gray-600">
                  <Bell className="h-6 w-6" />
                </button>
              </RoleBasedAccess>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role?.replace("_", " ")}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Link to="/profile" className="text-gray-400 hover:text-gray-600">
                    <User className="h-6 w-6" />
                  </Link>
                  <button onClick={handleLogout} className="text-gray-400 hover:text-gray-600">
                    <LogOut className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

export default Layout
