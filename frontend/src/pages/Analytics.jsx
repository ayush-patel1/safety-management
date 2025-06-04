import React from "react"
import { useData } from "../contexts/DataContext"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, TrendingDown, Activity, AlertTriangle, Clock, CheckCircle } from "lucide-react"

const Analytics = () => {
  const { analytics } = useData()

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#F97316"]

  const kpiCards = [
    {
      title: "Machine Uptime",
      value: `${Math.round((analytics.dashboard.machines.running / analytics.dashboard.machines.total) * 100)}%`,
      change: "+2.1%",
      changeType: "increase",
      icon: Activity,
      color: "green",
    },
    {
      title: "Mean Time to Repair",
      value: `${analytics.mttr.average}h`,
      change: "-0.5h",
      changeType: "decrease",
      icon: Clock,
      color: "blue",
    },
    {
      title: "Open Incidents",
      value: analytics.dashboard.incidents.open,
      change: "+3",
      changeType: "increase",
      icon: AlertTriangle,
      color: "red",
    },
    {
      title: "Maintenance Completion",
      value: `${analytics.maintenanceCompletion.rate}%`,
      change: "+5.2%",
      changeType: "increase",
      icon: CheckCircle,
      color: "green",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">Monitor performance metrics and trends</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div key={kpi.title} className="card p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-md bg-${kpi.color}-100`}>
                  <Icon className={`h-6 w-6 text-${kpi.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{kpi.value}</p>
                    <div className="ml-2 flex items-center text-sm">
                      {kpi.changeType === "increase" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span className={`ml-1 ${kpi.changeType === "increase" ? "text-green-600" : "text-red-600"}`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Machine Status Distribution */}
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Machine Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.machineStatusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analytics.machineStatusDistribution?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Machines by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.departmentDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Ticket Trends */}
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Ticket Trends (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.ticketTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="tickets" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Incident Types */}
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Incidents by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.incidentTrends} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="type" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">MTTR Details</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Average Repair Time:</span>
              <span className="text-sm font-medium">{analytics.mttr.average}h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Resolved Tickets:</span>
              <span className="text-sm font-medium">{analytics.mttr.totalResolved}</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Maintenance Performance</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Completion Rate:</span>
              <span className="text-sm font-medium">{analytics.maintenanceCompletion.rate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Completed Tasks:</span>
              <span className="text-sm font-medium">{analytics.maintenanceCompletion.completed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Tasks:</span>
              <span className="text-sm font-medium">{analytics.maintenanceCompletion.total}</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Safety Overview</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Open Incidents:</span>
              <span className="text-sm font-medium">{analytics.dashboard.incidents.open}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Critical Incidents:</span>
              <span className="text-sm font-medium">{analytics.dashboard.incidents.critical}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
