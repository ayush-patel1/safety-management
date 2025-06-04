
import React from "react"
import { createContext, useContext, useState } from "react"
import {
  mockMachines,
  mockTickets,
  mockIncidents,
  mockMaintenanceSchedules,
  mockUsers,
  mockAnalytics,
} from "../data/mockData"
import toast from "react-hot-toast"

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}

export const DataProvider = ({ children }) => {
  const [machines, setMachines] = useState(mockMachines)
  const [tickets, setTickets] = useState(mockTickets)
  const [incidents, setIncidents] = useState(mockIncidents)
  const [maintenanceSchedules, setMaintenanceSchedules] = useState(mockMaintenanceSchedules)
  const [users] = useState(mockUsers)
  const [analytics] = useState(mockAnalytics)

  // Helper function to generate unique IDs
  const generateId = () => String(Date.now() + Math.random())

  // Helper function to generate ticket numbers
  const generateTicketNumber = () => {
    const count = tickets.length + 1
    return `TKT-${String(count).padStart(6, "0")}`
  }

  // Helper function to generate incident numbers
  const generateIncidentNumber = () => {
    const count = incidents.length + 1
    return `INC-${String(count).padStart(6, "0")}`
  }

  // Machine operations
  const createMachine = (machineData) => {
    const newMachine = {
      id: generateId(),
      ...machineData,
      status: "Idle",
      operatingHours: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setMachines((prev) => [...prev, newMachine])
    toast.success("Machine created successfully!")
    return newMachine
  }

  const updateMachine = (id, updates) => {
    setMachines((prev) =>
      prev.map((machine) =>
        machine.id === id
          ? {
              ...machine,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : machine,
      ),
    )
    toast.success("Machine updated successfully!")
  }

  const deleteMachine = (id) => {
    setMachines((prev) => prev.filter((machine) => machine.id !== id))
    toast.success("Machine deleted successfully!")
  }

  // Ticket operations
  const createTicket = (ticketData) => {
    const newTicket = {
      id: generateId(),
      ticketNumber: generateTicketNumber(),
      ...ticketData,
      status: "Pending",
      comments: [],
      attachments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTickets((prev) => [...prev, newTicket])
    toast.success("Ticket created successfully!")
    return newTicket
  }

  const updateTicket = (id, updates) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : ticket,
      ),
    )
    toast.success("Ticket updated successfully!")
  }

  const addTicketComment = (ticketId, comment, userId) => {
    const newComment = {
      id: generateId(),
      userId,
      comment,
      timestamp: new Date().toISOString(),
    }

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              comments: [...ticket.comments, newComment],
              updatedAt: new Date().toISOString(),
            }
          : ticket,
      ),
    )
    toast.success("Comment added successfully!")
  }

  // Incident operations
  const createIncident = (incidentData) => {
    const newIncident = {
      id: generateId(),
      incidentNumber: generateIncidentNumber(),
      ...incidentData,
      status: "Open",
      correctiveActions: incidentData.correctiveActions || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setIncidents((prev) => [...prev, newIncident])
    toast.success("Incident reported successfully!")
    return newIncident
  }

  const updateIncident = (id, updates) => {
    setIncidents((prev) =>
      prev.map((incident) =>
        incident.id === id
          ? {
              ...incident,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : incident,
      ),
    )
    toast.success("Incident updated successfully!")
  }

  // Maintenance operations
  const createMaintenanceSchedule = (scheduleData) => {
    const newSchedule = {
      id: generateId(),
      ...scheduleData,
      status: "Scheduled",
      checklist: scheduleData.checklist || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setMaintenanceSchedules((prev) => [...prev, newSchedule])
    toast.success("Maintenance scheduled successfully!")
    return newSchedule
  }

  const updateMaintenanceSchedule = (id, updates) => {
    setMaintenanceSchedules((prev) =>
      prev.map((schedule) =>
        schedule.id === id
          ? {
              ...schedule,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : schedule,
      ),
    )
    toast.success("Maintenance schedule updated!")
  }

  const updateChecklistItem = (scheduleId, itemIndex, updates) => {
    setMaintenanceSchedules((prev) =>
      prev.map((schedule) => {
        if (schedule.id === scheduleId) {
          const newChecklist = [...schedule.checklist]
          newChecklist[itemIndex] = { ...newChecklist[itemIndex], ...updates }
          return {
            ...schedule,
            checklist: newChecklist,
            updatedAt: new Date().toISOString(),
          }
        }
        return schedule
      }),
    )
    toast.success("Checklist updated!")
  }

  // Helper functions to get related data
  const getMachineById = (id) => machines.find((machine) => machine.id === id)
  const getUserById = (id) => users.find((user) => user.id === id)
  const getTicketById = (id) => tickets.find((ticket) => ticket.id === id)
  const getIncidentById = (id) => incidents.find((incident) => incident.id === id)
  const getMaintenanceById = (id) => maintenanceSchedules.find((schedule) => schedule.id === id)

  // Filter functions
  const filterMachines = (filters) => {
    return machines.filter((machine) => {
      if (filters.department && machine.department !== filters.department) return false
      if (filters.status && machine.status !== filters.status) return false
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        return (
          machine.name.toLowerCase().includes(searchLower) ||
          machine.machineId.toLowerCase().includes(searchLower) ||
          machine.location.toLowerCase().includes(searchLower)
        )
      }
      return true
    })
  }

  const filterTickets = (filters) => {
    return tickets.filter((ticket) => {
      if (filters.status && ticket.status !== filters.status) return false
      if (filters.priority && ticket.priority !== filters.priority) return false
      if (filters.assignedTo && ticket.assignedTo !== filters.assignedTo) return false
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        return (
          ticket.title.toLowerCase().includes(searchLower) || ticket.ticketNumber.toLowerCase().includes(searchLower)
        )
      }
      return true
    })
  }

  const filterIncidents = (filters) => {
    return incidents.filter((incident) => {
      if (filters.type && incident.type !== filters.type) return false
      if (filters.severity && incident.severity !== filters.severity) return false
      if (filters.status && incident.status !== filters.status) return false
      if (filters.department && incident.department !== filters.department) return false
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        return (
          incident.title.toLowerCase().includes(searchLower) ||
          incident.incidentNumber.toLowerCase().includes(searchLower)
        )
      }
      return true
    })
  }

  const filterMaintenanceSchedules = (filters) => {
    return maintenanceSchedules.filter((schedule) => {
      if (filters.status && schedule.status !== filters.status) return false
      if (filters.machineId && schedule.machineId !== filters.machineId) return false
      if (filters.assignedTo && schedule.assignedTo !== filters.assignedTo) return false
      if (filters.startDate && filters.endDate) {
        const scheduleDate = new Date(schedule.scheduledDate)
        const start = new Date(filters.startDate)
        const end = new Date(filters.endDate)
        return scheduleDate >= start && scheduleDate <= end
      }
      return true
    })
  }

  const value = {
    // Data
    machines,
    tickets,
    incidents,
    maintenanceSchedules,
    users,
    analytics,

    // Machine operations
    createMachine,
    updateMachine,
    deleteMachine,

    // Ticket operations
    createTicket,
    updateTicket,
    addTicketComment,

    // Incident operations
    createIncident,
    updateIncident,

    // Maintenance operations
    createMaintenanceSchedule,
    updateMaintenanceSchedule,
    updateChecklistItem,

    // Helper functions
    getMachineById,
    getUserById,
    getTicketById,
    getIncidentById,
    getMaintenanceById,

    // Filter functions
    filterMachines,
    filterTickets,
    filterIncidents,
    filterMaintenanceSchedules,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}
