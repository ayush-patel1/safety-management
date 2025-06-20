import { createContext, useContext } from "react"
import axios from "axios"
import React from "react"
import toast from "react-hot-toast"

const DataContext = createContext()

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL
axios.defaults.baseURL = API_BASE_URL

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}

export const DataProvider = ({ children }) => {
  // Machine operations
  const createMachine = async (machineData) => {
    try {
      const response = await axios.post("/api/machines", machineData)
      toast.success("Machine created successfully!")
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create machine")
      throw error
    }
  }

  const updateMachine = async (id, updates) => {
    try {
      const response = await axios.put(`/api/machines/${id}`, updates)
      toast.success("Machine updated successfully!")
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update machine")
      throw error
    }
  }

  const deleteMachine = async (id) => {
    try {
      await axios.delete(`/api/machines/${id}`)
      toast.success("Machine deleted successfully!")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete machine")
      throw error
    }
  }

  const updateMachineStatus = async (id, status) => {
    try {
      const response = await axios.patch(`/api/machines/${id}/status`, { status })
      toast.success("Machine status updated!")
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update machine status")
      throw error
    }
  }

  // Ticket operations
  const createTicket = async (ticketData) => {
    try {
      const response = await axios.post("/api/tickets", ticketData)
      toast.success("Ticket created successfully!")
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create ticket")
      throw error
    }
  }

  const updateTicket = async (id, updates) => {
    try {
      const response = await axios.put(`/api/tickets/${id}`, updates)
      toast.success("Ticket updated successfully!")
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update ticket")
      throw error
    }
  }

  const addTicketComment = async (ticketId, comment) => {
    try {
      const response = await axios.post(`/api/tickets/${ticketId}/comments`, { comment })
      toast.success("Comment added successfully!")
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add comment")
      throw error
    }
  }

  const uploadTicketAttachment = async (ticketId, file) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await axios.post(`/api/tickets/${ticketId}/attachments`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      toast.success("File uploaded successfully!")
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload file")
      throw error
    }
  }

  // Incident operations
  const createIncident = async (incidentData) => {
    try {
      const response = await axios.post("/api/incidents", incidentData)
      toast.success("Incident reported successfully!")
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to report incident")
      throw error
    }
  }

  const updateIncident = async (id, updates) => {
    try {
      const response = await axios.put(`/api/incidents/${id}`, updates)
      toast.success("Incident updated successfully!")
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update incident")
      throw error
    }
  }

  const uploadIncidentAttachment = async (incidentId, file) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await axios.post(`/api/incidents/${incidentId}/attachments`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      toast.success("File uploaded successfully!")
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload file")
      throw error
    }
  }

  // Maintenance operations
  const createMaintenanceSchedule = async (scheduleData) => {
    try {
      const response = await axios.post("/api/maintenance", scheduleData)
      toast.success("Maintenance scheduled successfully!")
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to schedule maintenance")
      throw error
    }
  }

  const updateMaintenanceSchedule = async (id, updates) => {
    try {
      const response = await axios.put(`/api/maintenance/${id}`, updates)
      toast.success("Maintenance schedule updated!")
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update maintenance schedule")
      throw error
    }
  }

  const updateChecklistItem = async (scheduleId, itemIndex, updates) => {
    try {
      const response = await axios.patch(`/api/maintenance/${scheduleId}/checklist/${itemIndex}`, updates)
      toast.success("Checklist updated!")
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update checklist")
      throw error
    }
  }

  // File upload operations
  const uploadFile = async (file) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await axios.post("/api/upload/single", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload file")
      throw error
    }
  }

  const uploadMultipleFiles = async (files) => {
    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append("files", file)
      })

      const response = await axios.post("/api/upload/multiple", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload files")
      throw error
    }
  }

  const deleteFile = async (publicId) => {
    try {
      await axios.delete(`/api/upload/${publicId}`)
      toast.success("File deleted successfully!")
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete file")
      throw error
    }
  }

  const value = {
    // Machine operations
    createMachine,
    updateMachine,
    deleteMachine,
    updateMachineStatus,

    // Ticket operations
    createTicket,
    updateTicket,
    addTicketComment,
    uploadTicketAttachment,

    // Incident operations
    createIncident,
    updateIncident,
    uploadIncidentAttachment,

    // Maintenance operations
    createMaintenanceSchedule,
    updateMaintenanceSchedule,
    updateChecklistItem,

    // File operations
    uploadFile,
    uploadMultipleFiles,
    deleteFile,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
