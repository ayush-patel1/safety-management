const mongoose = require("mongoose")

const machineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    machineId: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      enum: ["Rolling Mill", "Smelting", "Casting", "Quality Control"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Running", "Down", "Maintenance", "Idle"],
      default: "Idle",
    },
    location: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    installationDate: {
      type: Date,
      required: true,
    },
    lastMaintenanceDate: {
      type: Date,
    },
    nextMaintenanceDate: {
      type: Date,
    },
    operatingHours: {
      type: Number,
      default: 0,
    },
    specifications: {
      capacity: String,
      power: String,
      dimensions: String,
      weight: String,
    },
    qrCode: {
      type: String,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Machine", machineSchema)
