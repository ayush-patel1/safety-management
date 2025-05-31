const mongoose = require("mongoose")

const incidentSchema = new mongoose.Schema(
  {
    incidentNumber: {
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
    type: {
      type: String,
      enum: ["Near Miss", "Injury", "Property Damage", "Environmental", "Security"],
      required: true,
    },
    severity: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      enum: ["Rolling Mill", "Smelting", "Casting", "Quality Control", "Maintenance"],
      required: true,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    involvedPersons: [
      {
        name: String,
        role: String,
        department: String,
      },
    ],
    witnesses: [
      {
        name: String,
        contact: String,
      },
    ],
    immediateActions: {
      type: String,
    },
    rootCause: {
      type: String,
    },
    correctiveActions: [
      {
        action: String,
        assignedTo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        dueDate: Date,
        status: {
          type: String,
          enum: ["Pending", "In Progress", "Completed"],
          default: "Pending",
        },
      },
    ],
    status: {
      type: String,
      enum: ["Open", "Under Investigation", "Closed"],
      default: "Open",
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
    incidentDate: {
      type: Date,
      required: true,
    },
    closedAt: Date,
  },
  {
    timestamps: true,
  },
)

// Generate incident number
incidentSchema.pre("save", async function (next) {
  if (!this.incidentNumber) {
    const count = await mongoose.model("Incident").countDocuments()
    this.incidentNumber = `INC-${String(count + 1).padStart(6, "0")}`
  }
  next()
})

module.exports = mongoose.model("Incident", incidentSchema)
