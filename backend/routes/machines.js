const express = require("express")
const Machine = require("../models/machine")
const { auth, authorize } = require("../middlewares/auth")

const router = express.Router()

// Get all machines
router.get("/", auth, async (req, res) => {
  try {
    const { department, status, search } = req.query
    const query = { isActive: true }

    if (department) query.department = department
    if (status) query.status = status
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { machineId: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ]
    }

    const machines = await Machine.find(query).sort({ name: 1 })
    res.json(machines)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get machine by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const machine = await Machine.findById(req.params.id)
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" })
    }
    res.json(machine)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create machine
router.post("/", auth, authorize("admin", "maintenance_engineer"), async (req, res) => {
  try {
    const machine = new Machine(req.body)
    await machine.save()
    res.status(201).json(machine)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update machine
router.put("/:id", auth, authorize("admin", "maintenance_engineer"), async (req, res) => {
  try {
    const machine = await Machine.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" })
    }
    res.json(machine)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update machine status
router.patch("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body
    const machine = await Machine.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" })
    }
    res.json(machine)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete machine
router.delete("/:id", auth, authorize("admin"), async (req, res) => {
  try {
    const machine = await Machine.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true })
    if (!machine) {
      return res.status(404).json({ message: "Machine not found" })
    }
    res.json({ message: "Machine deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
