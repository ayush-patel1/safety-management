const express = require("express")
const Machine = require("../models/machine")
const Ticket = require("../models/Ticket")
const Incident = require("../models/Maintenance")
const MaintenanceSchedule = require("../models/MaintenanceSchedule")
const { auth, authorize } = require("../middlewares/auth")

const router = express.Router()

// Dashboard overview
router.get("/dashboard", auth, async (req, res) => {
  try {
    const [
      totalMachines,
      runningMachines,
      downMachines,
      maintenanceMachines,
      openTickets,
      pendingMaintenance,
      openIncidents,
      criticalIncidents,
    ] = await Promise.all([
      Machine.countDocuments({ isActive: true }),
      Machine.countDocuments({ status: "Running", isActive: true }),
      Machine.countDocuments({ status: "Down", isActive: true }),
      Machine.countDocuments({ status: "Maintenance", isActive: true }),
      Ticket.countDocuments({ status: { $in: ["Pending", "In Progress"] } }),
      MaintenanceSchedule.countDocuments({ status: "Scheduled" }),
      Incident.countDocuments({ status: { $in: ["Open", "Under Investigation"] } }),
      Incident.countDocuments({ severity: "Critical", status: { $in: ["Open", "Under Investigation"] } }),
    ])

    res.json({
      machines: {
        total: totalMachines,
        running: runningMachines,
        down: downMachines,
        maintenance: maintenanceMachines,
      },
      tickets: {
        open: openTickets,
      },
      maintenance: {
        pending: pendingMaintenance,
      },
      incidents: {
        open: openIncidents,
        critical: criticalIncidents,
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Machine status distribution
router.get("/machines/status-distribution", auth, async (req, res) => {
  try {
    const distribution = await Machine.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ])

    res.json(distribution)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Department-wise machine count
router.get("/machines/department-distribution", auth, async (req, res) => {
  try {
    const distribution = await Machine.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$department", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ])

    res.json(distribution)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Ticket trends (last 6 months)
router.get("/tickets/trends", auth, async (req, res) => {
  try {
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const trends = await Ticket.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ])

    res.json(trends)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Mean Time to Repair (MTTR)
router.get("/tickets/mttr", auth, async (req, res) => {
  try {
    const resolvedTickets = await Ticket.find({
      status: "Resolved",
      resolvedAt: { $exists: true },
    })

    let totalRepairTime = 0
    let validTickets = 0

    resolvedTickets.forEach((ticket) => {
      if (ticket.resolvedAt && ticket.createdAt) {
        const repairTime = (ticket.resolvedAt - ticket.createdAt) / (1000 * 60 * 60) // hours
        totalRepairTime += repairTime
        validTickets++
      }
    })

    const mttr = validTickets > 0 ? totalRepairTime / validTickets : 0

    res.json({
      mttr: Math.round(mttr * 100) / 100, // Round to 2 decimal places
      totalResolvedTickets: validTickets,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Incident trends by type
router.get("/incidents/type-trends", auth, async (req, res) => {
  try {
    const trends = await Incident.aggregate([
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ])

    res.json(trends)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Monthly incident count
router.get("/incidents/monthly-trends", auth, async (req, res) => {
  try {
    const twelveMonthsAgo = new Date()
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)

    const trends = await Incident.aggregate([
      { $match: { createdAt: { $gte: twelveMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ])

    res.json(trends)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Maintenance completion rate
router.get("/maintenance/completion-rate", auth, async (req, res) => {
  try {
    const [completed, total] = await Promise.all([
      MaintenanceSchedule.countDocuments({ status: "Completed" }),
      MaintenanceSchedule.countDocuments(),
    ])

    const completionRate = total > 0 ? (completed / total) * 100 : 0

    res.json({
      completionRate: Math.round(completionRate * 100) / 100,
      completed,
      total,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
