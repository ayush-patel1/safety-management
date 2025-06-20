"use client"

import { useState } from "react"
import { useData } from "../contexts/DataContext"
import { useAuth } from "../contexts/AuthContext"
import { X, Paperclip, Calendar, User, Clock } from "lucide-react"

const TicketDetailsModal = ({ ticket, onClose, onUpdate }) => {
  const { addTicketComment } = useData()
  const { user } = useAuth()
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      setLoading(true)
      try {
        await addTicketComment(ticket._id, newComment)
        setNewComment("")
        onUpdate()
      } catch (error) {
        // Error is handled in the context
      } finally {
        setLoading(false)
      }
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{ticket.ticketNumber}</h3>
                <p className="text-sm text-gray-500">{ticket.title}</p>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{ticket.description}</p>
                </div>

                {/* Comments */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Comments ({ticket.comments?.length || 0})</h4>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {ticket.comments?.map((comment) => (
                      <div key={comment._id} className="bg-gray-50 p-3 rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">{comment.user?.name}</span>
                          <span className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.comment}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment */}
                  <form onSubmit={handleAddComment} className="mt-4">
                    <textarea
                      className="textarea"
                      rows={3}
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={loading || !newComment.trim()}
                        className="btn btn-primary disabled:opacity-50"
                      >
                        {loading ? "Adding..." : "Add Comment"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Status & Priority */}
                <div className="card p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Status & Priority</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Status:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Priority:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Category:</span>
                      <span className="text-sm font-medium">{ticket.category}</span>
                    </div>
                  </div>
                </div>

                {/* Machine Info */}
                <div className="card p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Machine Details</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-500">Name:</span>
                      <p className="text-sm font-medium">{ticket.machine?.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">ID:</span>
                      <p className="text-sm font-medium">{ticket.machine?.machineId}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Department:</span>
                      <p className="text-sm font-medium">{ticket.machine?.department}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Location:</span>
                      <p className="text-sm font-medium">{ticket.machine?.location}</p>
                    </div>
                  </div>
                </div>

                {/* People */}
                <div className="card p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">People</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Reported by</p>
                        <p className="text-sm font-medium">{ticket.reportedBy?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Assigned to</p>
                        <p className="text-sm font-medium">{ticket.assignedTo?.name || "Unassigned"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="card p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Timeline</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Created</p>
                        <p className="text-sm font-medium">{new Date(ticket.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    {ticket.estimatedHours && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm text-gray-500">Estimated Hours</p>
                          <p className="text-sm font-medium">{ticket.estimatedHours}h</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Attachments */}
                {ticket.attachments?.length > 0 && (
                  <div className="card p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Attachments</h4>
                    <div className="space-y-2">
                      {ticket.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center">
                          <Paperclip className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                            {attachment.originalName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetailsModal
