import { useData } from "../contexts/DataContext"
import { Settings, AlertTriangle, Wrench, Calendar, TrendingUp, TrendingDown, Activity } from "lucide-react"
import React from "react"
const Dashboard = () => {
  const { analytics, tickets, incidents, machines } = useData()

  const stats = [
    {
      name: "Total Machines",
      value: analytics.dashboard.machines.total,
      icon: Settings,
      color: "blue",
      change: "+2.1%",
      changeType: "increase",
    },
    {
      name: "Running Machines",
      value: analytics.dashboard.machines.running,
      icon: Activity,
      color: "green",
      change: "+5.4%",
      changeType: "increase",
    },
    {
      name: "Down Machines",
      value: analytics.dashboard.machines.down,
      icon: AlertTriangle,
      color: "red",
      change: "-2.1%",
      changeType: "decrease",
    },
    {
      name: "Open Tickets",
      value: analytics.dashboard.tickets.open,
      icon: Wrench,
      color: "yellow",
      change: "+1.2%",
      changeType: "increase",
    },
  ]

  const recentTickets = tickets.slice(0, 5)
  const recentIncidents = incidents.slice(0, 5)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to the Industrial Maintenance & Safety Portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="card p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-md bg-${stat.color}-100`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <div className="ml-2 flex items-center text-sm">
                      {stat.changeType === "increase" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`ml-1 ${stat.changeType === "increase" ? "text-green-600" : "text-red-600"}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Machine Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Machine Status Distribution</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Running</span>
              </div>
              <span className="text-sm font-medium">{analytics.dashboard.machines.running}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Down</span>
              </div>
              <span className="text-sm font-medium">{analytics.dashboard.machines.down}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Maintenance</span>
              </div>
              <span className="text-sm font-medium">{analytics.dashboard.machines.maintenance}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Idle</span>
              </div>
              <span className="text-sm font-medium">{analytics.dashboard.machines.idle}</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full btn btn-primary text-left">
              <Wrench className="h-4 w-4 mr-2" />
              Create Maintenance Ticket
            </button>
            <button className="w-full btn btn-secondary text-left">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report Safety Incident
            </button>
            <button className="w-full btn btn-secondary text-left">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Maintenance
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Tickets</h3>
          <div className="space-y-3">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm font-medium text-gray-900">{ticket.title}</p>
                  <p className="text-xs text-gray-500">{ticket.ticketNumber}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    ticket.priority === "Critical"
                      ? "priority-critical"
                      : ticket.priority === "High"
                        ? "priority-high"
                        : ticket.priority === "Medium"
                          ? "priority-medium"
                          : "priority-low"
                  }`}
                >
                  {ticket.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Incidents</h3>
          <div className="space-y-3">
            {recentIncidents.map((incident) => (
              <div key={incident.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="text-sm font-medium text-gray-900">{incident.title}</p>
                  <p className="text-xs text-gray-500">{incident.type}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    incident.severity === "Critical"
                      ? "priority-critical"
                      : incident.severity === "High"
                        ? "priority-high"
                        : incident.severity === "Medium"
                          ? "priority-medium"
                          : "priority-low"
                  }`}
                >
                  {incident.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
