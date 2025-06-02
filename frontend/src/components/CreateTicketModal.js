import { useState } from "react"
import { useQuery, useMutation } from "react-query"
import axios from "axios"
import { X } from "lucide-react"
import toast from "react-hot-toast"

const CreateTicketModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    machine: "",
    priority: "Medium",
    category: "Mechanical",
    estimatedHours: "",
  })

  const { data: machines } = useQuery("machines", () => axios.get("/api/machines").then((res) => res.data))

  const createTicketMutation = useMutation((data) => axios.post("/api/tickets", data), {
    onSuccess: () => {
      toast.success("Ticket created successfully!")
      onSuccess()
      onClose()
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create ticket")
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createTicketMutation.mutate(formData)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Create Maintenance Ticket</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="input"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Brief description of the issue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Machine</label>
                <select name="machine" required className="select" value={formData.machine} onChange={handleChange}>
                  <option value="">Select a machine</option>
                  {machines?.map((machine) => (
                    <option key={machine._id} value={machine._id}>
                      {machine.name} ({machine.machineId})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select name="priority" className="select" value={formData.priority} onChange={handleChange}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select name="category" className="select" value={formData.category} onChange={handleChange}>
                    <option value="Electrical">Electrical</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Hydraulic">Hydraulic</option>
                    <option value="Pneumatic">Pneumatic</option>
                    <option value="Software">Software</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Hours</label>
                <input
                  type="number"
                  name="estimatedHours"
                  className="input"
                  value={formData.estimatedHours}
                  onChange={handleChange}
                  placeholder="Estimated repair time"
                  min="0"
                  step="0.5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  className="textarea"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed description of the issue..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onClose} className="btn btn-secondary">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createTicketMutation.isLoading}
                  className="btn btn-primary disabled:opacity-50"
                >
                  {createTicketMutation.isLoading ? "Creating..." : "Create Ticket"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTicketModal
