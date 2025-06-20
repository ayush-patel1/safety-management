const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    machine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
      required: true,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Closed"],
      default: "Pending",
    },
    category: {
      type: String,
      enum: ["Electrical", "Mechanical", "Hydraulic", "Pneumatic", "Software", "Other"],
      required: true,
    },
    estimatedHours: {
      type: Number,
    },
    actualHours: {
      type: Number,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    attachments: [
      {
        filename: String,
        originalName: String,
        path: String,
        uploadedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    resolvedAt: Date,
    closedAt: Date,
  },
  {
    timestamps: true,
  },
)

// Generate ticket number
ticketSchema.pre("save", async function (next) {
  if (!this.ticketNumber) {
    const count = await mongoose.model("Ticket").countDocuments()
    this.ticketNumber = `TKT-${String(count + 1).padStart(6, "0")}`
  }
  next()
})

module.exports = mongoose.model("Ticket", ticketSchema)
