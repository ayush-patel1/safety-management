import { useApi } from "../hooks/useApi"
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
import LoadingSpinner from "../components/LoadingSpinner"

const Analytics = () => {
  const { data: dashboardData, loading: dashboardLoading } = useApi("/api/analytics/dashboard")
  const { data: machineStatusData } = useApi("/api/analytics/machines/status-distribution")
  const { data: departmentData } = useApi("/api/analytics/machines/department-distribution")
  const { data: ticketTrends } = useApi("/api/analytics/tickets/trends")
  const { data: mttrData } = useApi("/api/analytics/tickets/mttr")
  const { data: incidentTrends } = useApi("/api/analytics/incidents/type-trends")
  const { data: monthlyIncidents } = useApi("/api/analytics/incidents/monthly-trends")
  const { data: maintenanceCompletion } = useApi("/api/analytics/maintenance/completion-rate")

  if (dashboardLoading) return <LoadingSpinner />

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#F97316"]

  const formatTicketTrends = (data) => {
    return (
      data?.map((item) => ({
        month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
        tickets: item.count,
      })) || []
    )
  }

  const formatMonthlyIncidents = (data) => {
    return (
      data?.map((item) => ({
        month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
        incidents: item.count,
      })) || []
    )
  }

  const kpiCards = [
    {
      title: "Machine Uptime",
      value:
        dashboardData?.machines?.running && dashboardData?.machines?.total
          ? `${Math.round((dashboardData.machines.running / dashboardData.machines.total) * 100)}%`
          : "0%",
      change: "+2.1%",
      changeType: "increase",
      icon: Activity,
      color: "green",
    },
    {
      title: "Mean Time to Repair",
      value: mttrData?.mttr ? `${mttrData.mttr}h` : "0h",
      change: "-0.5h",
      changeType: "decrease",
      icon: Clock,
      color: "blue",
    },
    {
      title: "Open Incidents",
      value: dashboardData?.incidents?.open || 0,
      change: "+3",
      changeType: "increase",
      icon: AlertTriangle,
      color: "red",
    },
    {
      title: "Maintenance Completion",
      value: maintenanceCompletion?.completionRate ? `${maintenanceCompletion.completionRate}%` : "0%",
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
                data={machineStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ _id, count }) => `${_id}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {machineStatusData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Ticket Trends */}
        <div className="card p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Ticket Trends (Last 6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formatTicketTrends(ticketTrends)}>
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
            <BarChart data={incidentTrends} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="_id" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Incidents Trend */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Incident Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={formatMonthlyIncidents(monthlyIncidents)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="incidents" stroke="#EF4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">MTTR Details</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Average Repair Time:</span>
              <span className="text-sm font-medium">{mttrData?.mttr || 0}h</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Resolved Tickets:</span>
              <span className="text-sm font-medium">{mttrData?.totalResolvedTickets || 0}</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Maintenance Performance</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Completion Rate:</span>
              <span className="text-sm font-medium">{maintenanceCompletion?.completionRate || 0}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Completed Tasks:</span>
              <span className="text-sm font-medium">{maintenanceCompletion?.completed || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Tasks:</span>
              <span className="text-sm font-medium">{maintenanceCompletion?.total || 0}</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Safety Overview</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Open Incidents:</span>
              <span className="text-sm font-medium">{dashboardData?.incidents?.open || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Critical Incidents:</span>
              <span className="text-sm font-medium">{dashboardData?.incidents?.critical || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
