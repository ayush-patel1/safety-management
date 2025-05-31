const express = require("express")
const multer = require("multer")
const path = require("path")
const Incident = require("../models/incident")
const { auth, authorize } = require("../middlewares/auth")

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/incidents/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
})

// Get all incidents
router.get("/", auth, async (req, res) => {
  try {
    const { type, severity, status, department, page = 1, limit = 10 } = req.query
    const query = {}

    if (type) query.type = type
    if (severity) query.severity = severity
    if (status) query.status = status
    if (department) query.department = department

    const incidents = await Incident.find(query)
      .populate("reportedBy", "name email department")
      .populate("correctiveActions.assignedTo", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Incident.countDocuments(query)

    res.json({
      incidents,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get incident by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id)
      .populate("reportedBy", "name email department")
      .populate("correctiveActions.assignedTo", "name email department")

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" })
    }
    res.json(incident)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create incident
router.post("/", auth, async (req, res) => {
  try {
    const incidentData = {
      ...req.body,
      reportedBy: req.user._id,
    }

    const incident = new Incident(incidentData)
    await incident.save()

    const populatedIncident = await Incident.findById(incident._id).populate("reportedBy", "name email department")

    res.status(201).json(populatedIncident)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update incident
router.put("/:id", auth, authorize("admin", "safety_officer"), async (req, res) => {
  try {
    const incident = await Incident.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate("reportedBy", "name email department")
      .populate("correctiveActions.assignedTo", "name email department")

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" })
    }
    res.json(incident)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Upload attachment
router.post("/:id/attachments", auth, upload.single("file"), async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id)

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" })
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    incident.attachments.push({
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      uploadedBy: req.user._id,
    })

    await incident.save()
    res.json({ message: "File uploaded successfully", incident })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
