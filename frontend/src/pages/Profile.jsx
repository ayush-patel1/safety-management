"use client"
import React from "react"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { User, Mail, Phone, Building, Shield, Edit, Save, X } from "lucide-react"
import toast from "react-hot-toast"

const Profile = () => {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    department: user?.department || "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = () => {
    // Here you would typically make an API call to update the user profile
    toast.success("Profile updated successfully!")
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      department: user?.department || "",
    })
    setIsEditing(false)
  }

  const getRoleDisplayName = (role) => {
    switch (role) {
      case "admin":
        return "Administrator"
      case "maintenance_engineer":
        return "Maintenance Engineer"
      case "safety_officer":
        return "Safety Officer"
      case "operator":
        return "Operator"
      default:
        return role
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800"
      case "maintenance_engineer":
        return "bg-blue-100 text-blue-800"
      case "safety_officer":
        return "bg-orange-100 text-orange-800"
      case "operator":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your account information and preferences</p>
      </div>

      {/* Profile Header */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
              <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getRoleColor(user?.role)}`}>
                {getRoleDisplayName(user?.role)}
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`btn ${isEditing ? "btn-secondary" : "btn-primary"}`}
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <User className="h-4 w-4 inline mr-2" />
                Full Name
              </label>
              {isEditing ? (
                <input type="text" name="name" className="input" value={formData.name} onChange={handleChange} />
              ) : (
                <p className="text-gray-900">{user?.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Mail className="h-4 w-4 inline mr-2" />
                Email Address
              </label>
              {isEditing ? (
                <input type="email" name="email" className="input" value={formData.email} onChange={handleChange} />
              ) : (
                <p className="text-gray-900">{user?.email}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Phone className="h-4 w-4 inline mr-2" />
                Phone Number
              </label>
              {isEditing ? (
                <input type="tel" name="phone" className="input" value={formData.phone} onChange={handleChange} />
              ) : (
                <p className="text-gray-900">{user?.phone || "Not provided"}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Building className="h-4 w-4 inline mr-2" />
                Department
              </label>
              {isEditing ? (
                <select name="department" className="select" value={formData.department} onChange={handleChange}>
                  <option value="Rolling Mill">Rolling Mill</option>
                  <option value="Smelting">Smelting</option>
                  <option value="Casting">Casting</option>
                  <option value="Quality Control">Quality Control</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              ) : (
                <p className="text-gray-900">{user?.department}</p>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button onClick={handleCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button onClick={handleSave} className="btn btn-primary">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Role Permissions */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          <Shield className="h-5 w-5 inline mr-2" />
          Role & Permissions
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Role:</span>
            <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(user?.role)}`}>
              {getRoleDisplayName(user?.role)}
            </span>
          </div>
          <div className="text-sm text-gray-600">
            <p className="mb-2">Your role grants you access to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              {user?.role === "admin" && (
                <>
                  <li>Full system administration</li>
                  <li>User management</li>
                  <li>All reports and analytics</li>
                  <li>System configuration</li>
                </>
              )}
              {user?.role === "maintenance_engineer" && (
                <>
                  <li>Maintenance ticket management</li>
                  <li>Machine status updates</li>
                  <li>Maintenance scheduling</li>
                  <li>Technical reports</li>
                </>
              )}
              {user?.role === "safety_officer" && (
                <>
                  <li>Safety incident management</li>
                  <li>Safety reports and analytics</li>
                  <li>Corrective action tracking</li>
                  <li>Safety compliance monitoring</li>
                </>
              )}
              {user?.role === "operator" && (
                <>
                  <li>Report maintenance issues</li>
                  <li>View machine status</li>
                  <li>Report safety incidents</li>
                  <li>Basic dashboard access</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
        <div className="space-y-4">
          <button className="btn btn-secondary w-full md:w-auto">Change Password</button>
          <div className="text-sm text-gray-600">
            <p>Last login: {new Date().toLocaleDateString()}</p>
            <p>Account created: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
