"use client"

import { useState } from "react"
import { usePaginatedApi } from "../hooks/useApi"
import { useData } from "../contexts/DataContext"
import { Search, Filter, Plus, Settings, AlertTriangle } from "lucide-react"
import LoadingSpinner from "../components/LoadingSpinner"
import CreateMachineModal from "../components/CreateMachineModal"

const Machines = () => {
  const [filters, setFilters] = useState({
    department: "",
    status: "",
    search: "",
  })
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { updateMachineStatus } = useData()

  const { data: machines, loading, refetch } = usePaginatedApi("/api/machines", { filters })

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleStatusChange = async (machineId, newStatus) => {
    try {
      await updateMachineStatus(machineId, newStatus)
      refetch()
    } catch (error) {
      // Error is handled in the context
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Running":
        return "status-running"
      case "Down":
        return "status-down"
      case "Maintenance":
        return "status-maintenance"
      default:
        return "status-idle"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Running":
        return <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
      case "Down":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "Maintenance":
        return <Settings className="w-4 h-4 text-yellow-500" />
      default:
        return <div className="w-2 h-2 bg-gray-500 rounded-full" />
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Machines</h1>
          <p className="text-gray-600">Monitor and manage all industrial machines</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Machine
        </button>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search machines..."
              className="input pl-10"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          <select
            className="select"
            value={filters.department}
            onChange={(e) => handleFilterChange("department", e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Rolling Mill">Rolling Mill</option>
            <option value="Smelting">Smelting</option>
            <option value="Casting">Casting</option>
            <option value="Quality Control">Quality Control</option>
          </select>
          <select
            className="select"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Running">Running</option>
            <option value="Down">Down</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Idle">Idle</option>
          </select>
          <button className="btn btn-secondary">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Machines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines?.map((machine) => (
          <div key={machine._id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{machine.name}</h3>
                <p className="text-sm text-gray-500">{machine.machineId}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(machine.status)}
                <select
                  className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(machine.status)}`}
                  value={machine.status}
                  onChange={(e) => handleStatusChange(machine._id, e.target.value)}
                >
                  <option value="Running">Running</option>
                  <option value="Down">Down</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Idle">Idle</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Department:</span>
                <span className="font-medium">{machine.department}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Location:</span>
                <span className="font-medium">{machine.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Model:</span>
                <span className="font-medium">{machine.model}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Operating Hours:</span>
                <span className="font-medium">{machine.operatingHours?.toLocaleString() || 0}h</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 btn btn-secondary text-sm">View Details</button>
              <button className="flex-1 btn btn-primary text-sm">Create Ticket</button>
            </div>
          </div>
        ))}
      </div>

      {machines?.length === 0 && (
        <div className="text-center py-12">
          <Settings className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No machines found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new machine to the system.</p>
          <div className="mt-6">
            <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Machine
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && (
        <CreateMachineModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            refetch()
          }}
        />
      )}
    </div>
  )
}

export default Machines
