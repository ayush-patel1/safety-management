import React from "react"
import { useState } from "react"
import { useData } from "../contexts/DataContext"
import { X } from "lucide-react"

const CreateMachineModal = ({ onClose, onSuccess }) => {
  const { createMachine } = useData()
  const [formData, setFormData] = useState({
    name: "",
    machineId: "",
    department: "Rolling Mill",
    location: "",
    model: "",
    manufacturer: "",
    installationDate: "",
    specifications: {
      capacity: "",
      power: "",
      dimensions: "",
      weight: "",
    },
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createMachine(formData)
      onSuccess()
    } catch (error) {
      // Error is handled in the context
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith("specifications.")) {
      const specField = name.split(".")[1]
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [specField]: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Machine</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Machine Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="input"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Rolling Mill #3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Machine ID</label>
                  <input
                    type="text"
                    name="machineId"
                    required
                    className="input"
                    value={formData.machineId}
                    onChange={handleChange}
                    placeholder="e.g., RM-003"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select name="department" className="select" value={formData.department} onChange={handleChange}>
                    <option value="Rolling Mill">Rolling Mill</option>
                    <option value="Smelting">Smelting</option>
                    <option value="Casting">Casting</option>
                    <option value="Quality Control">Quality Control</option>
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
                    placeholder="e.g., Building A - Floor 1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <input
                    type="text"
                    name="model"
                    required
                    className="input"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="e.g., RM-2000X"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                  <input
                    type="text"
                    name="manufacturer"
                    required
                    className="input"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    placeholder="e.g., SteelTech Industries"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Installation Date</label>
                <input
                  type="date"
                  name="installationDate"
                  required
                  className="input"
                  value={formData.installationDate}
                  onChange={handleChange}
                />
              </div>

              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Specifications</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                    <input
                      type="text"
                      name="specifications.capacity"
                      className="input"
                      value={formData.specifications.capacity}
                      onChange={handleChange}
                      placeholder="e.g., 500 tons/hour"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Power</label>
                    <input
                      type="text"
                      name="specifications.power"
                      className="input"
                      value={formData.specifications.power}
                      onChange={handleChange}
                      placeholder="e.g., 2000 kW"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
                    <input
                      type="text"
                      name="specifications.dimensions"
                      className="input"
                      value={formData.specifications.dimensions}
                      onChange={handleChange}
                      placeholder="e.g., 15m x 8m x 6m"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                    <input
                      type="text"
                      name="specifications.weight"
                      className="input"
                      value={formData.specifications.weight}
                      onChange={handleChange}
                      placeholder="e.g., 150 tons"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onClose} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn btn-primary disabled:opacity-50">
                  {loading ? "Creating..." : "Create Machine"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateMachineModal
