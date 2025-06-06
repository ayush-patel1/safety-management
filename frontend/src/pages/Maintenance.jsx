"use client"
import React, { useState } from "react"
import { useData } from "../contexts/DataContext"
import { Calendar, Plus, Filter, Clock, User, Settings } from "lucide-react"

const Maintenance = () => {
  const { filterMaintenanceSchedules, machines, updateMaintenanceSchedule } = useData()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState("calendar")
  const [filters, setFilters] = useState({ status: "", machineId: "", assignedTo: "" })

  const [selectedDay, setSelectedDay] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const year = currentDate.getFullYear()
  const startDate = new Date(year, currentDate.getMonth(), 1).toISOString().split("T")[0]
  const endDate = new Date(year, currentDate.getMonth() + 1, 0).toISOString().split("T")[0]

  const schedules = filterMaintenanceSchedules({ ...filters, startDate, endDate })

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null)
    for (let day = 1; day <= daysInMonth; day++) days.push(new Date(year, month, day))
    return days
  }

  const getSchedulesForDate = (date) => {
    if (!date || !schedules) return []
    const dateStr = date.toISOString().split("T")[0]
    return schedules.filter((s) => new Date(s.scheduledDate).toISOString().split("T")[0] === dateStr)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800"
      case "In Progress": return "bg-blue-100 text-blue-800"
      case "Scheduled": return "bg-yellow-100 text-yellow-800"
      case "Overdue": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical": return "border-l-red-500"
      case "High": return "border-l-orange-500"
      case "Medium": return "border-l-yellow-500"
      default: return "border-l-blue-500"
    }
  }

  const navigateMonth = (dir) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + dir)
    setCurrentDate(newDate)
  }

  const handleStatusChange = (id, status) => {
    updateMaintenanceSchedule(id, { status })
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Preventive Maintenance</h1>
          <p className="text-gray-600">Schedule and track maintenance activities</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex rounded-md shadow-sm">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                view === "calendar" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setView("calendar")}
            >Calendar</button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
                view === "list" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setView("list")}
            >List</button>
          </div>
          <button className="btn btn-primary">
            <Plus className="h-4 w-4 mr-2" /> Schedule Maintenance
          </button>
        </div>
      </div>

      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select className="select" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
            <option value="">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Overdue">Overdue</option>
          </select>
          <select className="select" value={filters.machineId} onChange={(e) => setFilters({ ...filters, machineId: e.target.value })}>
            <option value="">All Machines</option>
            {machines?.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <select className="select" value={filters.assignedTo} onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}>
            <option value="">All Assignees</option>
          </select>
          <button className="btn btn-secondary">
            <Filter className="h-4 w-4 mr-2" /> More Filters
          </button>
        </div>
      </div>

      {view === "calendar" ? (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
            <div className="flex space-x-2">
              <button onClick={() => navigateMonth(-1)} className="btn btn-secondary">←</button>
              <button onClick={() => setCurrentDate(new Date())} className="btn btn-secondary">Today</button>
              <button onClick={() => navigateMonth(1)} className="btn btn-secondary">→</button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="p-2 text-center text-sm font-medium text-gray-500 bg-gray-50">{d}</div>
            ))}
            {days.map((day, index) => {
              const daySchedules = day ? getSchedulesForDate(day) : []
              const isToday = day && day.toDateString() === new Date().toDateString()
              return (
                <div
                  key={index}
                  onClick={() => { if (day) { setSelectedDay(day); setShowModal(true) } }}
                  className={`cursor-pointer min-h-[120px] p-2 border border-gray-200 ${day ? "bg-white hover:bg-gray-50" : "bg-gray-50"} ${isToday ? "ring-2 ring-blue-500" : ""}`}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-medium mb-2 ${isToday ? "text-blue-600" : "text-gray-900"}`}>{day.getDate()}</div>
                      <div className="space-y-1">
                        {daySchedules.slice(0, 3).map((s) => {
                          const machine = machines?.find((m) => m.id === s.machineId)
                          return (
                            <div key={s.id} className={`text-xs p-1 rounded border-l-2 ${getPriorityColor(s.priority)} bg-gray-50`}>
                              <div className="font-medium truncate">{s.title}</div>
                              <div className="text-gray-500 truncate">{machine?.name}</div>
                            </div>
                          )
                        })}
                        {daySchedules.length > 3 && (
                          <div className="text-xs text-gray-500">+{daySchedules.length - 3} more</div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {schedules?.map((schedule) => {
            const machine = machines?.find((m) => m.id === schedule.machineId)
            return (
              <div key={schedule.id} className="card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{schedule.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(schedule.status)}`}>{schedule.status}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(schedule.priority).replace("border-l-", "bg-").replace("-500", "-100")} ${getPriorityColor(schedule.priority).replace("border-l-", "text-").replace("-500", "-800")}`}>{schedule.priority}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center"><Settings className="h-4 w-4 text-gray-400 mr-2" /><span className="text-sm text-gray-600">{machine?.name}</span></div>
                      <div className="flex items-center"><Calendar className="h-4 w-4 text-gray-400 mr-2" /><span className="text-sm text-gray-600">{new Date(schedule.scheduledDate).toLocaleDateString()}</span></div>
                      <div className="flex items-center"><Clock className="h-4 w-4 text-gray-400 mr-2" /><span className="text-sm text-gray-600">{schedule.estimatedDuration}h</span></div>
                    </div>
                    {schedule.description && <p className="text-sm text-gray-600 mb-4">{schedule.description}</p>}
                    {schedule.assignedTo && <div className="flex items-center"><User className="h-4 w-4 text-gray-400 mr-2" /><span className="text-sm text-gray-600">Assigned to User</span></div>}
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn btn-secondary text-sm">Edit</button>
                    <select className={`text-xs rounded px-2 py-1 border-0 ${getStatusColor(schedule.status)}`} value={schedule.status} onChange={(e) => handleStatusChange(schedule.id, e.target.value)}>
                      <option value="Scheduled">Scheduled</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </div>
                </div>
              </div>
            )
          })}
          {schedules?.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No maintenance scheduled</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by scheduling preventive maintenance.</p>
              <div className="mt-6">
                <button className="btn btn-primary">
                  <Plus className="h-4 w-4 mr-2" /> Schedule Maintenance
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {showModal && selectedDay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Maintenance on {selectedDay.toDateString()}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-black">✕</button>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {getSchedulesForDate(selectedDay).map((s) => {
                const machine = machines?.find((m) => m.id === s.machineId)
                return (
                  <div key={s.id} className={`p-3 border-l-4 rounded ${getPriorityColor(s.priority)} bg-gray-50`}>
                    <div className="font-semibold">{s.title}</div>
                    <div className="text-sm text-gray-600">{machine?.name}</div>
                    <div className="text-sm text-gray-500">
                      {s.status} - {s.estimatedDuration}h
                    </div>
                    {s.description && <div className="text-sm text-gray-500">{s.description}</div>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Maintenance
