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
    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    completedAt: Date,
    partsUsed: [
      {
        partName: String,
        quantity: Number,
        cost: Number,
      },
    ],
    totalCost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Index for efficient queries
maintenanceScheduleSchema.index({ scheduledDate: 1 })
maintenanceScheduleSchema.index({ machine: 1 })
maintenanceScheduleSchema.index({ assignedTo: 1 })
maintenanceScheduleSchema.index({ status: 1 })

// Virtual for overdue status
maintenanceScheduleSchema.virtual("isOverdue").get(function () {
  return this.status === "Scheduled" && this.scheduledDate < new Date()
})

// Pre-save middleware to update status if overdue
maintenanceScheduleSchema.pre("save", function (next) {
  if (this.status === "Scheduled" && this.scheduledDate < new Date()) {
    this.status = "Overdue"
  }
  next()
})

// Method to calculate next scheduled date based on frequency
maintenanceScheduleSchema.methods.calculateNextScheduledDate = function () {
  const currentDate = this.scheduledDate
  const nextDate = new Date(currentDate)

  switch (this.frequency) {
    case "Daily":
      nextDate.setDate(nextDate.getDate() + 1)
      break
    case "Weekly":
      nextDate.setDate(nextDate.getDate() + 7)
      break
    case "Monthly":
      nextDate.setMonth(nextDate.getMonth() + 1)
      break
    case "Quarterly":
      nextDate.setMonth(nextDate.getMonth() + 3)
      break
    case "Semi-Annual":
      nextDate.setMonth(nextDate.getMonth() + 6)
      break
    case "Annual":
      nextDate.setFullYear(nextDate.getFullYear() + 1)
      break
    default:
      //resolve issue here at this statement
      return null
  }

  return nextDate
}

// Method to mark as completed
maintenanceScheduleSchema.methods.markCompleted = function (userId) {
  this.status = "Completed"
  this.completedBy = userId
  this.completedAt = new Date()
  this.actualEndTime = new Date()

  // Calculate next scheduled date
  const nextDate = this.calculateNextScheduledDate()
  if (nextDate) {
    this.nextScheduledDate = nextDate
  }

  return this.save()
}

// Static method to find overdue maintenance
maintenanceScheduleSchema.statics.findOverdue = function () {
  return this.find({
    status: "Scheduled",
    scheduledDate: { $lt: new Date() },
  }).populate("machine", "name machineId department")
}

// Static method to find upcoming maintenance (next 7 days)
maintenanceScheduleSchema.statics.findUpcoming = function () {
  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 7)

  return this.find({
    status: "Scheduled",
    scheduledDate: {
      $gte: new Date(),
      $lte: nextWeek,
    },
  }).populate("machine", "name machineId department")
}

const MaintenanceSchedule = mongoose.model('MaintenanceSchedule', maintenanceScheduleSchema);
module.exports = MaintenanceSchedule