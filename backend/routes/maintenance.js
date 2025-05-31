const express = require("express")
const MaintenanceSchedule = require("../models/MaintenanceSchedule")
const { auth, authorize } = require("../middlewares/auth")

const router = express.Router()

// Get all maintenance schedules
router.get("/", auth, async (req, res) => {
  try {
    const { status, machine, assignedTo, startDate, endDate } = req.query
    const query = {}

    if (status) query.status = status
    if (machine) query.machine = machine
    if (assignedTo) query.assignedTo = assignedTo

    if (startDate && endDate) {
      query.scheduledDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }
    }

    const schedules = await MaintenanceSchedule.find(query)
      .populate("machine", "name machineId department location")
      .populate("assignedTo", "name email department")
      .sort({ scheduledDate: 1 })

    res.json(schedules)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get maintenance schedule by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const schedule = await MaintenanceSchedule.findById(req.params.id)
      .populate("machine", "name machineId department location")
      .populate("assignedTo", "name email department")

    if (!schedule) {
      return res.status(404).json({ message: "Maintenance schedule not found" })
    }
    res.json(schedule)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create maintenance schedule
router.post("/", auth, authorize("admin", "maintenance_engineer"), async (req, res) => {
  try {
    const schedule = new MaintenanceSchedule(req.body)
    await schedule.save()

    const populatedSchedule = await MaintenanceSchedule.findById(schedule._id)
      .populate("machine", "name machineId department")
      .populate("assignedTo", "name email department")

    res.status(201).json(populatedSchedule)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update maintenance schedule
router.put("/:id", auth, authorize("admin", "maintenance_engineer"), async (req, res) => {
  try {
    const schedule = await MaintenanceSchedule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("machine", "name machineId department")
      .populate("assignedTo", "name email department")

    if (!schedule) {
      return res.status(404).json({ message: "Maintenance schedule not found" })
    }
    res.json(schedule)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update checklist item
router.patch("/:id/checklist/:itemIndex", auth, async (req, res) => {
  try {
    const { id, itemIndex } = req.params
    const { completed, notes } = req.body

    const schedule = await MaintenanceSchedule.findById(id)
    if (!schedule) {
      return res.status(404).json({ message: "Maintenance schedule not found" })
    }

    if (itemIndex >= schedule.checklist.length) {
      return res.status(400).json({ message: "Invalid checklist item index" })
    }

    schedule.checklist[itemIndex].completed = completed
    if (notes !== undefined) {
      schedule.checklist[itemIndex].notes = notes
    }

    await schedule.save()
    res.json(schedule)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get calendar view
router.get("/calendar/:year/:month", auth, async (req, res) => {
  try {
    const { year, month } = req.params
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)

    const schedules = await MaintenanceSchedule.find({
      scheduledDate: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .populate("machine", "name machineId department")
      .populate("assignedTo", "name email")

    res.json(schedules)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
