"use client"
import React from "react"
import { useState } from "react"
import { useData } from "../contexts/DataContext"
import { useAuth } from "../contexts/AuthContext"
import { X, Plus, Minus } from "lucide-react"

const CreateIncidentModal = ({ onClose }) => {
  const { createIncident } = useData()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Near Miss",
    severity: "Medium",
    location: "",
    department: "Rolling Mill",
    incidentDate: new Date().toISOString().split("T")[0],
    involvedPersons: [{ name: "", role: "", department: "" }],
    witnesses: [{ name: "", contact: "" }],
    immediateActions: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createIncident({
        ...formData,
        reportedBy: user.id,
        incidentDate: new Date(formData.incidentDate).toISOString(),
      })
      onClose()
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

  const handleArrayChange = (arrayName, index, field, value) => {
    const newArray = [...formData[arrayName]]
    newArray[index][field] = value
    setFormData({
      ...formData,
      [arrayName]: newArray,
    })
  }

  const addArrayItem = (arrayName, template) => {
    setFormData({
      ...formData,
      [arrayName]: [...formData[arrayName], template],
    })
  }

  const removeArrayItem = (arrayName, index) => {
    const newArray = formData[arrayName].filter((_, i) => i !== index)
    setFormData({
      ...formData,
      [arrayName]: newArray,
    })
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Report Safety Incident</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="input"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Brief description of the incident"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Incident Date</label>
                  <input
                    type="date"
                    name="incidentDate"
                    required
                    className="input"
                    value={formData.incidentDate}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select name="type" className="select" value={formData.type} onChange={handleChange}>
                    <option value="Near Miss">Near Miss</option>
                    <option value="Injury">Injury</option>
                    <option value="Property Damage">Property Damage</option>
                    <option value="Environmental">Environmental</option>
                    <option value="Security">Security</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                  <select name="severity" className="select" value={formData.severity} onChange={handleChange}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    required
                    className="input"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Specific location where incident occurred"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select name="department" className="select" value={formData.department} onChange={handleChange}>
                    <option value="Rolling Mill">Rolling Mill</option>
                    <option value="Smelting">Smelting</option>
                    <option value="Casting">Casting</option>
                    <option value="Quality Control">Quality Control</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  className="textarea"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed description of what happened..."
                />
              </div>

              {/* Involved Persons */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">Involved Persons</label>
                  <button
                    type="button"
                    onClick={() => addArrayItem("involvedPersons", { name: "", role: "", department: "" })}
                    className="btn btn-secondary text-sm"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Person
                  </button>
                </div>
                {formData.involvedPersons.map((person, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Name"
                      className="input"
                      value={person.name}
                      onChange={(e) => handleArrayChange("involvedPersons", index, "name", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      className="input"
                      value={person.role}
                      onChange={(e) => handleArrayChange("involvedPersons", index, "role", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Department"
                      className="input"
                      value={person.department}
                      onChange={(e) => handleArrayChange("involvedPersons", index, "department", e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("involvedPersons", index)}
                      className="btn btn-danger text-sm"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Witnesses */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">Witnesses</label>
                  <button
                    type="button"
                    onClick={() => addArrayItem("witnesses", { name: "", contact: "" })}
                    className="btn btn-secondary text-sm"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Witness
                  </button>
                </div>
                {formData.witnesses.map((witness, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Name"
                      className="input"
                      value={witness.name}
                      onChange={(e) => handleArrayChange("witnesses", index, "name", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Contact"
                      className="input"
                      value={witness.contact}
                      onChange={(e) => handleArrayChange("witnesses", index, "contact", e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("witnesses", index)}
                      className="btn btn-danger text-sm"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Immediate Actions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Immediate Actions Taken</label>
                <textarea
                  name="immediateActions"
                  rows={3}
                  className="textarea"
                  value={formData.immediateActions}
                  onChange={handleChange}
                  placeholder="Describe any immediate actions taken to address the incident..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onClose} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn btn-primary disabled:opacity-50">
                  {loading ? "Reporting..." : "Report Incident"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateIncidentModal
