const express = require("express")
const multer = require("multer")
const path = require("path")
const Ticket = require("../models/Ticket")
const { auth, authorize } = require("../middlewares/auth")

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/tickets/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error("Invalid file type"))
    }
  },
})

// Get all tickets
router.get("/", auth, async (req, res) => {
  try {
    const { status, priority, assignedTo, department, page = 1, limit = 10 } = req.query
    const query = {}

    if (status) query.status = status
    if (priority) query.priority = priority
    if (assignedTo) query.assignedTo = assignedTo

    const tickets = await Ticket.find(query)
      .populate("machine", "name machineId department")
      .populate("reportedBy", "name email department")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Ticket.countDocuments(query)

    res.json({
      tickets,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get ticket by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("machine", "name machineId department location")
      .populate("reportedBy", "name email department")
      .populate("assignedTo", "name email department")
      .populate("comments.user", "name email")

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" })
    }
    res.json(ticket)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create ticket
router.post("/", auth, async (req, res) => {
  try {
    const ticketData = {
      ...req.body,
      reportedBy: req.user._id,
    }

    const ticket = new Ticket(ticketData)
    await ticket.save()

    const populatedTicket = await Ticket.findById(ticket._id)
      .populate("machine", "name machineId department")
      .populate("reportedBy", "name email department")

    res.status(201).json(populatedTicket)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update ticket
router.put("/:id", auth, async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate("machine", "name machineId department")
      .populate("reportedBy", "name email department")
      .populate("assignedTo", "name email department")

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" })
    }
    res.json(ticket)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Add comment to ticket
router.post("/:id/comments", auth, async (req, res) => {
  try {
    const { comment } = req.body
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" })
    }

    ticket.comments.push({
      user: req.user._id,
      comment,
      timestamp: new Date(),
    })

    await ticket.save()

    const updatedTicket = await Ticket.findById(ticket._id).populate("comments.user", "name email")

    res.json(updatedTicket)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Upload attachment
router.post("/:id/attachments", auth, upload.single("file"), async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" })
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    ticket.attachments.push({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      uploadedBy: req.user._id,
    })

    await ticket.save()
    res.json({ message: "File uploaded successfully", ticket })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
