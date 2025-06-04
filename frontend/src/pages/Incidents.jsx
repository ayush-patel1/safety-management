"use client"
import React from "react"
import { useState } from "react"
import { useData } from "../contexts/DataContext"
import { Search, Filter, Plus, Eye, AlertTriangle, Calendar, FileText } from "lucide-react"
import CreateIncidentModal from "../components/CreateIncidentModal"

const Incidents = () => {
  const { filterIncidents, updateIncident } = useData()
  const [filters, setFilters] = useState({
    type: "",
    severity: "",
    status: "",
    search: "",
  })
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedIncident, setSelectedIncident] = useState(null)

  const incidents = filterIncidents(filters)

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleStatusChange = (incidentId, newStatus) => {
    updateIncident(incidentId, { status: newStatus })
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "priority-critical"
      case "High":
        return "priority-high"
      case "Medium":
        return "priority-medium"
      default:
        return "priority-low"
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "Near Miss":
        return "⚠️"
      case "Injury":
        return "🩹"
      case "Property Damage":
        return "🔧"
      case "Environmental":
        return "🌱"
      case "Security":
        return "🔒"
      default:
        return "📋"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Closed":
        return "bg-green-100 text-green-800"
      case "Under Investigation":
        return "bg-blue-100 text-blue-800"
      case "Open":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Calculate stats
  const openIncidents = incidents.filter((i) => i.status === "Open").length
  const underInvestigation = incidents.filter((i) => i.status === "Under Investigation").length
  const criticalSeverity = incidents.filter((i) => i.severity === "Critical").length
  const thisMonth = incidents.filter((i) => {
    const incidentDate = new Date(i.incidentDate)
    const now = new Date()
    return incidentDate.getMonth() === now.getMonth() && incidentDate.getFullYear() === now.getFullYear()
  }).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Safety Incidents</h1>
          <p className="text-gray-600">Track and manage safety incidents and near-miss events</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Report Incident
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Open Incidents</p>
              <p className="text-2xl font-semibold text-gray-900">{openIncidents}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-yellow-100">
              <FileText className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Under Investigation</p>
              <p className="text-2xl font-semibold text-gray-900">{underInvestigation}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-orange-100">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical Severity</p>
              <p className="text-2xl font-semibold text-gray-900">{criticalSeverity}</p>
            </div>
          </div>
        </div>
        <div className="card p-6">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-green-100">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-semibold text-gray-900">{thisMonth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search incidents..."
              className="input pl-10"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          <select className="select" value={filters.type} onChange={(e) => handleFilterChange("type", e.target.value)}>
            <option value="">All Types</option>
            <option value="Near Miss">Near Miss</option>
            <option value="Injury">Injury</option>
            <option value="Property Damage">Property Damage</option>
            <option value="Environmental">Environmental</option>
            <option value="Security">Security</option>
          </select>
          <select
            className="select"
            value={filters.severity}
            onChange={(e) => handleFilterChange("severity", e.target.value)}
          >
            <option value="">All Severity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          <select
            className="select"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="Under Investigation">Under Investigation</option>
            <option value="Closed">Closed</option>
          </select>
          <button className="btn btn-secondary">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Incidents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {incidents?.map((incident) => (
          <div key={incident.id} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{getTypeIcon(incident.type)}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{incident.incidentNumber}</h3>
                  <p className="text-sm text-gray-500">{incident.type}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getSeverityColor(incident.severity)}`}>
                  {incident.severity}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(incident.status)}`}>
                  {incident.status}
                </span>
              </div>
            </div>

            <h4 className="font-medium text-gray-900 mb-2">{incident.title}</h4>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{incident.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Location:</span>
                <span className="font-medium">{incident.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Department:</span>
                <span className="font-medium">{incident.department}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Incident Date:</span>
                <span className="font-medium">{new Date(incident.incidentDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(incident.createdAt).toLocaleDateString()}
              </div>
              <div className="flex space-x-2">
                <button className="btn btn-secondary text-sm" onClick={() => setSelectedIncident(incident)}>
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </button>
                <select
                  className={`text-xs rounded px-2 py-1 border-0 ${getStatusColor(incident.status)}`}
                  value={incident.status}
                  onChange={(e) => handleStatusChange(incident.id, e.target.value)}
                >
                  <option value="Open">Open</option>
                  <option value="Under Investigation">Under Investigation</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {incidents?.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No incidents found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by reporting a safety incident.</p>
          <div className="mt-6">
            <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Report Incident
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && <CreateIncidentModal onClose={() => setShowCreateModal(false)} />}
    </div>
  )
}

export default Incidents
