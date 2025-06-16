const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const Machine = require("../models/machine")
const Ticket = require("../models/Ticket")
const Incident = require("../models/Incident")
const MaintenanceSchedule = require("../models/MaintenanceSchedule")
const dotenv = require("dotenv")

dotenv.config()

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/imsp")

    // Clear existing data
    await User.deleteMany({})
    await Machine.deleteMany({})
    await Ticket.deleteMany({})
    await Incident.deleteMany({})
    await MaintenanceSchedule.deleteMany({})

    // Create users
    const users = [
      {
        name: "Admin User",
        email: "admin@imsp.com",
        password: "admin123",
        role: "admin",
        department: "Maintenance",
        phone: "+1234567890",
      },
      {
        name: "John Engineer",
        email: "john@imsp.com",
        password: "engineer123",
        role: "maintenance_engineer",
        department: "Maintenance",
        phone: "+1234567891",
      },
      {
        name: "Jane Operator",
        email: "jane@imsp.com",
        password: "operator123",
        role: "operator",
        department: "Rolling Mill",
        phone: "+1234567892",
      },
      {
        name: "Safety Officer",
        email: "safety@imsp.com",
        password: "safety123",
        role: "safety_officer",
        department: "Quality Control",
        phone: "+1234567893",
      },
    ]

    await User.insertMany(users)

    // Create machines
    const machines = [
      {
        name: "Rolling Mill #1",
        machineId: "RM-001",
        department: "Rolling Mill",
        status: "Running",
        location: "Building A - Floor 1",
        model: "RM-2000X",
        manufacturer: "SteelTech Industries",
        installationDate: new Date("2020-01-15"),
        operatingHours: 8760,
        specifications: {
          capacity: "500 tons/hour",
          power: "2000 kW",
          dimensions: "15m x 8m x 6m",
          weight: "150 tons",
        },
      },
      {
        name: "Smelting Furnace #1",
        machineId: "SF-001",
        department: "Smelting",
        status: "Maintenance",
        location: "Building B - Floor 1",
        model: "SF-3000",
        manufacturer: "FurnaceCorp",
        installationDate: new Date("2019-06-10"),
        operatingHours: 12000,
        specifications: {
          capacity: "200 tons/batch",
          power: "5000 kW",
          dimensions: "20m x 12m x 15m",
          weight: "300 tons",
        },
      },
      {
        name: "Casting Machine #1",
        machineId: "CM-001",
        department: "Casting",
        status: "Running",
        location: "Building C - Floor 1",
        model: "CM-1500",
        manufacturer: "CastMaster Ltd",
        installationDate: new Date("2021-03-20"),
        operatingHours: 6000,
        specifications: {
          capacity: "100 tons/hour",
          power: "1500 kW",
          dimensions: "12m x 6m x 4m",
          weight: "80 tons",
        },
      },
      {
        name: "Quality Control Scanner",
        machineId: "QC-001",
        department: "Quality Control",
        status: "Running",
        location: "Building D - Floor 2",
        model: "QCS-500",
        manufacturer: "QualityTech",
        installationDate: new Date("2022-01-10"),
        operatingHours: 4000,
        specifications: {
          capacity: "1000 scans/hour",
          power: "50 kW",
          dimensions: "3m x 2m x 2m",
          weight: "5 tons",
        },
      },
    ]

    await Machine.insertMany(machines)

    // Create tickets
    const tickets = [
      {
        title: "Oil Leakage in Rolling Mill #1",
        description: "Detected oil leakage near the main shaft.",
        machine: null, // will set after machines are created
        reportedBy: null, // will set after users are created
        status: "Open",
        priority: "High",
        assignedTo: null, // will set after users are created
        createdAt: new Date(),
      },
      {
        title: "Temperature Fluctuation in Smelting Furnace #1",
        description: "Temperature sensor shows abnormal readings.",
        machine: null,
        reportedBy: null,
        status: "In Progress",
        priority: "Medium",
        assignedTo: null,
        createdAt: new Date(),
      },
    ]

    // Fetch users and machines for references
    const allUsers = await User.find()
    const allMachines = await Machine.find()

    // Assign references for tickets
    tickets[0].machine = allMachines[0]._id
    tickets[0].reportedBy = allUsers[2]._id // Jane Operator
    tickets[0].assignedTo = allUsers[1]._id // John Engineer

    tickets[1].machine = allMachines[1]._id
    tickets[1].reportedBy = allUsers[3]._id // Safety Officer
    tickets[1].assignedTo = allUsers[1]._id // John Engineer

    await Ticket.insertMany(tickets)

    // Create incidents
    const incidents = [
      {
        title: "Minor Fire in Smelting Area",
        description: "Small fire broke out, quickly contained.",
        machine: allMachines[1]._id,
        reportedBy: allUsers[3]._id,
        severity: "High",
        status: "Resolved",
        occurredAt: new Date("2023-05-10T10:30:00Z"),
      },
      {
        title: "Worker Injury in Rolling Mill",
        description: "Operator injured hand during maintenance.",
        machine: allMachines[0]._id,
        reportedBy: allUsers[2]._id,
        severity: "Medium",
        status: "Investigating",
        occurredAt: new Date("2023-06-01T14:00:00Z"),
      },
    ]

    await Incident.insertMany(incidents)

    // Create maintenance schedules
    const schedules = [
      {
        machine: allMachines[0]._id,
        title: "Monthly Lubrication",
        description: "Lubricate all moving parts.",
        type: "Preventive",
        frequency: "Monthly",
        scheduledDate: new Date("2023-07-01"),
        estimatedDuration: 2,
        assignedTo: allUsers[1]._id,
        status: "Scheduled",
        priority: "Medium",
        checklist: [
          { task: "Check oil level", completed: false },
          { task: "Lubricate bearings", completed: false },
        ],
      },
      {
        machine: allMachines[2]._id,
        title: "Quarterly Inspection",
        description: "Full inspection of casting machine.",
        type: "Predictive",
        frequency: "Quarterly",
        scheduledDate: new Date("2023-08-15"),
        estimatedDuration: 4,
        assignedTo: allUsers[1]._id,
        status: "Scheduled",
        priority: "High",
        checklist: [
          { task: "Inspect sensors", completed: false },
          { task: "Test emergency stop", completed: false },
        ],
      },
    ]

    await MaintenanceSchedule.insertMany(schedules)

    console.log("Seed data created successfully!")
    console.log("Users created:")
    console.log("- admin@imsp.com (password: admin123)")
    console.log("- john@imsp.com (password: engineer123)")
    console.log("- jane@imsp.com (password: operator123)")
    console.log("- safety@imsp.com (password: safety123)")

    process.exit(0)
  } catch (error) {
    console.error("Error seeding data:", error)
    process.exit(1)
  }
}

seedData()