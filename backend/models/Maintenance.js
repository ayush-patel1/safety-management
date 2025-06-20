const mongoose = require("mongoose")

const maintenanceScheduleSchema = new mongoose.Schema(
  {
    machine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Machine",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["Preventive", "Predictive", "Corrective", "Emergency"],
      default: "Preventive",
    },
    frequency: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly", "Quarterly", "Semi-Annual", "Annual", "Custom"],
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    estimatedDuration: {
      type: Number, // in hours
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Scheduled", "In Progress", "Completed", "Overdue", "Cancelled"],
      default: "Scheduled",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },
    checklist: [
      {
        task: String,
        completed: {
          type: Boolean,
          default: false,
        },
        notes: String,
      },
    ],
    actualStartTime: Date,
    actualEndTime: Date,
    notes: String,
    nextScheduledDate: Date,
    reminderSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Maintenance", maintenanceScheduleSchema)
