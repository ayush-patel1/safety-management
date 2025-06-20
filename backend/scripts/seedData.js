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
    console.log("🌱 Starting comprehensive database seeding...")

    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/imsp")
    console.log("✅ Connected to MongoDB")

    // Clear existing data
    console.log("🗑️  Clearing existing data...")
    await User.deleteMany({})
    await Machine.deleteMany({})
    await Ticket.deleteMany({})
    await Incident.deleteMany({})
    await MaintenanceSchedule.deleteMany({})
    console.log("✅ Existing data cleared")

    // Create comprehensive user base
    console.log("👥 Creating users...")
    const users = [
      // Admin Users
      {
        name: "System Administrator",
        email: "admin@imsp.com",
        password: "admin123",
        role: "admin",
        department: "Maintenance",
        phone: "+1-555-0001",
      },
      {
        name: "Plant Manager",
        email: "manager@imsp.com",
        password: "manager123",
        role: "admin",
        department: "Quality Control",
        phone: "+1-555-0002",
      },

      // Maintenance Engineers
      {
        name: "John Mitchell",
        email: "john.mitchell@imsp.com",
        password: "engineer123",
        role: "maintenance_engineer",
        department: "Maintenance",
        phone: "+1-555-0101",
      },
      {
        name: "Sarah Chen",
        email: "sarah.chen@imsp.com",
        password: "engineer123",
        role: "maintenance_engineer",
        department: "Maintenance",
        phone: "+1-555-0102",
      },
      {
        name: "Mike Rodriguez",
        email: "mike.rodriguez@imsp.com",
        password: "engineer123",
        role: "maintenance_engineer",
        department: "Maintenance",
        phone: "+1-555-0103",
      },
      {
        name: "Emily Watson",
        email: "emily.watson@imsp.com",
        password: "engineer123",
        role: "maintenance_engineer",
        department: "Maintenance",
        phone: "+1-555-0104",
      },

      // Safety Officers
      {
        name: "David Thompson",
        email: "david.thompson@imsp.com",
        password: "safety123",
        role: "safety_officer",
        department: "Quality Control",
        phone: "+1-555-0201",
      },
      {
        name: "Lisa Park",
        email: "lisa.park@imsp.com",
        password: "safety123",
        role: "safety_officer",
        department: "Quality Control",
        phone: "+1-555-0202",
      },

      // Operators - Rolling Mill
      {
        name: "Robert Johnson",
        email: "robert.johnson@imsp.com",
        password: "operator123",
        role: "operator",
        department: "Rolling Mill",
        phone: "+1-555-0301",
      },
      {
        name: "Maria Garcia",
        email: "maria.garcia@imsp.com",
        password: "operator123",
        role: "operator",
        department: "Rolling Mill",
        phone: "+1-555-0302",
      },
      {
        name: "James Wilson",
        email: "james.wilson@imsp.com",
        password: "operator123",
        role: "operator",
        department: "Rolling Mill",
        phone: "+1-555-0303",
      },

      // Operators - Smelting
      {
        name: "Anna Kowalski",
        email: "anna.kowalski@imsp.com",
        password: "operator123",
        role: "operator",
        department: "Smelting",
        phone: "+1-555-0401",
      },
      {
        name: "Carlos Mendez",
        email: "carlos.mendez@imsp.com",
        password: "operator123",
        role: "operator",
        department: "Smelting",
        phone: "+1-555-0402",
      },
      {
        name: "Jennifer Lee",
        email: "jennifer.lee@imsp.com",
        password: "operator123",
        role: "operator",
        department: "Smelting",
        phone: "+1-555-0403",
      },

      // Operators - Casting
      {
        name: "Thomas Brown",
        email: "thomas.brown@imsp.com",
        password: "operator123",
        role: "operator",
        department: "Casting",
        phone: "+1-555-0501",
      },
      {
        name: "Rachel Davis",
        email: "rachel.davis@imsp.com",
        password: "operator123",
        role: "operator",
        department: "Casting",
        phone: "+1-555-0502",
      },

      // Quality Control
      {
        name: "Kevin Zhang",
        email: "kevin.zhang@imsp.com",
        password: "operator123",
        role: "operator",
        department: "Quality Control",
        phone: "+1-555-0601",
      },
      {
        name: "Amanda Taylor",
        email: "amanda.taylor@imsp.com",
        password: "operator123",
        role: "operator",
        department: "Quality Control",
        phone: "+1-555-0602",
      },
    ]

    const createdUsers = await User.insertMany(users)
    console.log(`✅ Created ${createdUsers.length} users`)

    // Create comprehensive machine inventory
    console.log("🏭 Creating machines...")
    const machines = [
      // Rolling Mill Department
      {
        name: "Primary Rolling Mill",
        machineId: "RM-001",
        department: "Rolling Mill",
        status: "Running",
        location: "Building A - Bay 1",
        model: "RM-3000X",
        manufacturer: "SteelTech Industries",
        installationDate: new Date("2019-03-15"),
        lastMaintenanceDate: new Date("2024-01-15"),
        nextMaintenanceDate: new Date("2024-02-15"),
        operatingHours: 12450,
        specifications: {
          capacity: "800 tons/hour",
          power: "3500 kW",
          dimensions: "18m x 10m x 8m",
          weight: "220 tons",
        },
        qrCode: "QR-RM-001",
      },
      {
        name: "Secondary Rolling Mill",
        machineId: "RM-002",
        department: "Rolling Mill",
        status: "Running",
        location: "Building A - Bay 2",
        model: "RM-3000X",
        manufacturer: "SteelTech Industries",
        installationDate: new Date("2019-05-20"),
        lastMaintenanceDate: new Date("2024-01-20"),
        nextMaintenanceDate: new Date("2024-02-20"),
        operatingHours: 11800,
        specifications: {
          capacity: "800 tons/hour",
          power: "3500 kW",
          dimensions: "18m x 10m x 8m",
          weight: "220 tons",
        },
        qrCode: "QR-RM-002",
      },
      {
        name: "Finishing Rolling Mill",
        machineId: "RM-003",
        department: "Rolling Mill",
        status: "Maintenance",
        location: "Building A - Bay 3",
        model: "RM-2500",
        manufacturer: "SteelTech Industries",
        installationDate: new Date("2020-01-10"),
        lastMaintenanceDate: new Date("2024-01-28"),
        nextMaintenanceDate: new Date("2024-02-28"),
        operatingHours: 9200,
        specifications: {
          capacity: "600 tons/hour",
          power: "2800 kW",
          dimensions: "15m x 8m x 6m",
          weight: "180 tons",
        },
        qrCode: "QR-RM-003",
      },

      // Smelting Department
      {
        name: "Electric Arc Furnace #1",
        machineId: "EAF-001",
        department: "Smelting",
        status: "Running",
        location: "Building B - Furnace Hall 1",
        model: "EAF-150T",
        manufacturer: "FurnaceCorp International",
        installationDate: new Date("2018-08-15"),
        lastMaintenanceDate: new Date("2024-01-10"),
        nextMaintenanceDate: new Date("2024-03-10"),
        operatingHours: 15600,
        specifications: {
          capacity: "150 tons/batch",
          power: "80 MW",
          dimensions: "25m x 15m x 20m",
          weight: "450 tons",
        },
        qrCode: "QR-EAF-001",
      },
      {
        name: "Electric Arc Furnace #2",
        machineId: "EAF-002",
        department: "Smelting",
        status: "Running",
        location: "Building B - Furnace Hall 2",
        model: "EAF-150T",
        manufacturer: "FurnaceCorp International",
        installationDate: new Date("2018-10-20"),
        lastMaintenanceDate: new Date("2024-01-12"),
        nextMaintenanceDate: new Date("2024-03-12"),
        operatingHours: 15200,
        specifications: {
          capacity: "150 tons/batch",
          power: "80 MW",
          dimensions: "25m x 15m x 20m",
          weight: "450 tons",
        },
        qrCode: "QR-EAF-002",
      },
      {
        name: "Ladle Furnace #1",
        machineId: "LF-001",
        department: "Smelting",
        status: "Running",
        location: "Building B - Ladle Station 1",
        model: "LF-120T",
        manufacturer: "MetalTech Solutions",
        installationDate: new Date("2019-02-05"),
        lastMaintenanceDate: new Date("2024-01-18"),
        nextMaintenanceDate: new Date("2024-02-18"),
        operatingHours: 11400,
        specifications: {
          capacity: "120 tons",
          power: "15 MW",
          dimensions: "12m x 8m x 15m",
          weight: "180 tons",
        },
        qrCode: "QR-LF-001",
      },
      {
        name: "Vacuum Degasser",
        machineId: "VD-001",
        department: "Smelting",
        status: "Down",
        location: "Building B - Treatment Station",
        model: "VD-100T",
        manufacturer: "VacuumTech Ltd",
        installationDate: new Date("2020-06-12"),
        lastMaintenanceDate: new Date("2024-01-25"),
        nextMaintenanceDate: new Date("2024-02-25"),
        operatingHours: 7800,
        specifications: {
          capacity: "100 tons/hour",
          power: "8 MW",
          dimensions: "15m x 10m x 12m",
          weight: "120 tons",
        },
        qrCode: "QR-VD-001",
      },

      // Casting Department
      {
        name: "Continuous Casting Machine #1",
        machineId: "CCM-001",
        department: "Casting",
        status: "Running",
        location: "Building C - Casting Bay 1",
        model: "CCM-6S",
        manufacturer: "CastMaster Technologies",
        installationDate: new Date("2019-11-20"),
        lastMaintenanceDate: new Date("2024-01-22"),
        nextMaintenanceDate: new Date("2024-02-22"),
        operatingHours: 10200,
        specifications: {
          capacity: "200 tons/hour",
          power: "4500 kW",
          dimensions: "35m x 12m x 15m",
          weight: "280 tons",
        },
        qrCode: "QR-CCM-001",
      },
      {
        name: "Continuous Casting Machine #2",
        machineId: "CCM-002",
        department: "Casting",
        status: "Running",
        location: "Building C - Casting Bay 2",
        model: "CCM-6S",
        manufacturer: "CastMaster Technologies",
        installationDate: new Date("2020-01-15"),
        lastMaintenanceDate: new Date("2024-01-24"),
        nextMaintenanceDate: new Date("2024-02-24"),
        operatingHours: 9800,
        specifications: {
          capacity: "200 tons/hour",
          power: "4500 kW",
          dimensions: "35m x 12m x 15m",
          weight: "280 tons",
        },
        qrCode: "QR-CCM-002",
      },
      {
        name: "Billet Cutting Machine",
        machineId: "BCM-001",
        department: "Casting",
        status: "Running",
        location: "Building C - Cutting Station",
        model: "BCM-500",
        manufacturer: "CutTech Industries",
        installationDate: new Date("2020-03-10"),
        lastMaintenanceDate: new Date("2024-01-26"),
        nextMaintenanceDate: new Date("2024-02-26"),
        operatingHours: 8600,
        specifications: {
          capacity: "500 cuts/hour",
          power: "800 kW",
          dimensions: "12m x 6m x 4m",
          weight: "45 tons",
        },
        qrCode: "QR-BCM-001",
      },
      {
        name: "Hydraulic Press #1",
        machineId: "HP-001",
        department: "Casting",
        status: "Idle",
        location: "Building C - Press Station 1",
        model: "HP-1200T",
        manufacturer: "HydroPress Systems",
        installationDate: new Date("2021-05-18"),
        lastMaintenanceDate: new Date("2024-01-20"),
        nextMaintenanceDate: new Date("2024-02-20"),
        operatingHours: 5400,
        specifications: {
          capacity: "1200 tons force",
          power: "1200 kW",
          dimensions: "10m x 6m x 8m",
          weight: "150 tons",
        },
        qrCode: "QR-HP-001",
      },

      // Quality Control Department
      {
        name: "X-Ray Inspection System",
        machineId: "XRI-001",
        department: "Quality Control",
        status: "Running",
        location: "Building D - Inspection Bay 1",
        model: "XRI-2000",
        manufacturer: "QualityVision Inc",
        installationDate: new Date("2021-08-25"),
        lastMaintenanceDate: new Date("2024-01-28"),
        nextMaintenanceDate: new Date("2024-02-28"),
        operatingHours: 4200,
        specifications: {
          capacity: "500 inspections/hour",
          power: "150 kW",
          dimensions: "8m x 4m x 3m",
          weight: "12 tons",
        },
        qrCode: "QR-XRI-001",
      },
      {
        name: "Ultrasonic Testing Machine",
        machineId: "UTM-001",
        department: "Quality Control",
        status: "Running",
        location: "Building D - Testing Lab",
        model: "UTM-Pro",
        manufacturer: "TestTech Solutions",
        installationDate: new Date("2022-02-14"),
        lastMaintenanceDate: new Date("2024-01-30"),
        nextMaintenanceDate: new Date("2024-03-01"),
        operatingHours: 3600,
        specifications: {
          capacity: "200 tests/hour",
          power: "75 kW",
          dimensions: "6m x 3m x 2m",
          weight: "8 tons",
        },
        qrCode: "QR-UTM-001",
      },
      {
        name: "Hardness Testing Machine",
        machineId: "HTM-001",
        department: "Quality Control",
        status: "Running",
        location: "Building D - Materials Lab",
        model: "HTM-500",
        manufacturer: "MaterialTest Corp",
        installationDate: new Date("2022-06-10"),
        lastMaintenanceDate: new Date("2024-01-25"),
        nextMaintenanceDate: new Date("2024-02-25"),
        operatingHours: 2800,
        specifications: {
          capacity: "100 tests/hour",
          power: "25 kW",
          dimensions: "3m x 2m x 2m",
          weight: "3 tons",
        },
        qrCode: "QR-HTM-001",
      },

      // Support Equipment
      {
        name: "Overhead Crane #1",
        machineId: "OHC-001",
        department: "Rolling Mill",
        status: "Running",
        location: "Building A - Crane Bay 1",
        model: "OHC-50T",
        manufacturer: "CraneTech Industries",
        installationDate: new Date("2019-01-20"),
        lastMaintenanceDate: new Date("2024-01-16"),
        nextMaintenanceDate: new Date("2024-02-16"),
        operatingHours: 11200,
        specifications: {
          capacity: "50 tons",
          power: "200 kW",
          dimensions: "30m span x 8m height",
          weight: "35 tons",
        },
        qrCode: "QR-OHC-001",
      },
      {
        name: "Conveyor System #1",
        machineId: "CVS-001",
        department: "Rolling Mill",
        status: "Running",
        location: "Building A - Transport Line 1",
        model: "CVS-Heavy",
        manufacturer: "ConveyorTech Ltd",
        installationDate: new Date("2019-04-15"),
        lastMaintenanceDate: new Date("2024-01-18"),
        nextMaintenanceDate: new Date("2024-02-18"),
        operatingHours: 10800,
        specifications: {
          capacity: "1000 tons/hour",
          power: "300 kW",
          dimensions: "100m x 3m x 2m",
          weight: "80 tons",
        },
        qrCode: "QR-CVS-001",
      },
    ]

    const createdMachines = await Machine.insertMany(machines)
    console.log(`✅ Created ${createdMachines.length} machines`)

    // Create comprehensive maintenance schedules
    console.log("📅 Creating maintenance schedules...")
    const maintenanceSchedules = [
      // Preventive Maintenance - Rolling Mill
      {
        machine: createdMachines[0]._id, // Primary Rolling Mill
        title: "Monthly Hydraulic System Inspection",
        description: "Complete inspection of hydraulic systems, fluid levels, and pressure testing",
        type: "Preventive",
        frequency: "Monthly",
        scheduledDate: new Date("2024-02-15"),
        estimatedDuration: 6,
        assignedTo: createdUsers[2]._id, // John Mitchell
        priority: "High",
        checklist: [
          { task: "Check hydraulic fluid levels", completed: false },
          { task: "Inspect hydraulic hoses and connections", completed: false },
          { task: "Test system pressure", completed: false },
          { task: "Clean hydraulic filters", completed: false },
          { task: "Check for leaks", completed: false },
        ],
      },
      {
        machine: createdMachines[1]._id, // Secondary Rolling Mill
        title: "Quarterly Bearing Replacement",
        description: "Replace main drive bearings and lubrication system maintenance",
        type: "Preventive",
        frequency: "Quarterly",
        scheduledDate: new Date("2024-02-20"),
        estimatedDuration: 12,
        assignedTo: createdUsers[3]._id, // Sarah Chen
        priority: "High",
        checklist: [
          { task: "Remove old bearings", completed: false },
          { task: "Install new bearings", completed: false },
          { task: "Apply proper lubrication", completed: false },
          { task: "Test bearing alignment", completed: false },
          { task: "Run performance test", completed: false },
        ],
      },

      // Furnace Maintenance
      {
        machine: createdMachines[3]._id, // Electric Arc Furnace #1
        title: "Semi-Annual Refractory Inspection",
        description: "Complete inspection and repair of furnace refractory lining",
        type: "Preventive",
        frequency: "Semi-Annual",
        scheduledDate: new Date("2024-03-10"),
        estimatedDuration: 24,
        assignedTo: createdUsers[4]._id, // Mike Rodriguez
        priority: "Critical",
        checklist: [
          { task: "Cool down furnace completely", completed: false },
          { task: "Inspect refractory lining", completed: false },
          { task: "Repair damaged sections", completed: false },
          { task: "Test thermal integrity", completed: false },
          { task: "Gradual heat-up procedure", completed: false },
        ],
      },
      {
        machine: createdMachines[4]._id, // Electric Arc Furnace #2
        title: "Monthly Electrode System Check",
        description: "Inspect and maintain electrode positioning and electrical systems",
        type: "Preventive",
        frequency: "Monthly",
        scheduledDate: new Date("2024-02-12"),
        estimatedDuration: 8,
        assignedTo: createdUsers[5]._id, // Emily Watson
        priority: "High",
        checklist: [
          { task: "Check electrode alignment", completed: false },
          { task: "Inspect electrical connections", completed: false },
          { task: "Test positioning system", completed: false },
          { task: "Calibrate control systems", completed: false },
        ],
      },

      // Casting Equipment
      {
        machine: createdMachines[8]._id, // Continuous Casting Machine #1
        title: "Weekly Mold Inspection",
        description: "Inspect casting molds and cooling systems",
        type: "Preventive",
        frequency: "Weekly",
        scheduledDate: new Date("2024-02-05"),
        estimatedDuration: 4,
        assignedTo: createdUsers[2]._id, // John Mitchell
        priority: "Medium",
        status: "Completed",
        completedBy: createdUsers[2]._id,
        completedAt: new Date("2024-02-05T14:00:00"),
        checklist: [
          { task: "Inspect mold surfaces", completed: true },
          { task: "Check cooling water flow", completed: true },
          { task: "Test temperature sensors", completed: true },
          { task: "Clean mold surfaces", completed: true },
        ],
      },

      // Emergency and Corrective Maintenance
      {
        machine: createdMachines[2]._id, // Finishing Rolling Mill
        title: "Emergency Motor Replacement",
        description: "Replace failed main drive motor - critical production impact",
        type: "Emergency",
        frequency: "Custom",
        scheduledDate: new Date("2024-01-28"),
        estimatedDuration: 16,
        assignedTo: createdUsers[4]._id, // Mike Rodriguez
        priority: "Critical",
        status: "In Progress",
        actualStartTime: new Date("2024-01-28T06:00:00"),
        checklist: [
          { task: "Isolate electrical systems", completed: true },
          { task: "Remove failed motor", completed: true },
          { task: "Install replacement motor", completed: false },
          { task: "Reconnect electrical systems", completed: false },
          { task: "Test motor operation", completed: false },
          { task: "Run production test", completed: false },
        ],
        partsUsed: [
          { partName: "Main Drive Motor 3500kW", quantity: 1, cost: 45000 },
          { partName: "Motor Coupling", quantity: 1, cost: 2500 },
          { partName: "Electrical Cables", quantity: 50, cost: 1200 },
        ],
        totalCost: 48700,
      },

      // Quality Control Equipment
      {
        machine: createdMachines[12]._id, // X-Ray Inspection System
        title: "Monthly Calibration Check",
        description: "Calibrate X-ray system and verify inspection accuracy",
        type: "Preventive",
        frequency: "Monthly",
        scheduledDate: new Date("2024-02-28"),
        estimatedDuration: 3,
        assignedTo: createdUsers[3]._id, // Sarah Chen
        priority: "Medium",
        checklist: [
          { task: "Run calibration standards", completed: false },
          { task: "Adjust X-ray intensity", completed: false },
          { task: "Verify image quality", completed: false },
          { task: "Update calibration records", completed: false },
        ],
      },

      // Overdue Maintenance (for demonstration)
      {
        machine: createdMachines[7]._id, // Vacuum Degasser
        title: "Overdue Vacuum Pump Service",
        description: "Service vacuum pumps and replace seals - OVERDUE",
        type: "Preventive",
        frequency: "Quarterly",
        scheduledDate: new Date("2024-01-25"),
        estimatedDuration: 8,
        assignedTo: createdUsers[5]._id, // Emily Watson
        priority: "High",
        status: "Overdue",
        checklist: [
          { task: "Service vacuum pumps", completed: false },
          { task: "Replace pump seals", completed: false },
          { task: "Test vacuum levels", completed: false },
          { task: "Check system integrity", completed: false },
        ],
      },

      // Upcoming Maintenance
      {
        machine: createdMachines[15]._id, // Overhead Crane #1
        title: "Annual Safety Inspection",
        description: "Complete annual safety inspection and certification",
        type: "Preventive",
        frequency: "Annual",
        scheduledDate: new Date("2024-02-16"),
        estimatedDuration: 6,
        assignedTo: createdUsers[6]._id, // David Thompson (Safety Officer)
        priority: "Critical",
        checklist: [
          { task: "Inspect wire ropes", completed: false },
          { task: "Test safety systems", completed: false },
          { task: "Check load blocks", completed: false },
          { task: "Verify emergency stops", completed: false },
          { task: "Update safety certification", completed: false },
        ],
      },
    ]

    const createdSchedules = await MaintenanceSchedule.insertMany(maintenanceSchedules)
    console.log(`✅ Created ${createdSchedules.length} maintenance schedules`)

    // Create comprehensive tickets
    console.log("🎫 Creating tickets...")
    const tickets = [
      // Critical Tickets
      {
        title: "Furnace Temperature Control Malfunction",
        description:
          "EAF #1 temperature control system showing erratic readings. Safety systems may be compromised. Immediate attention required.",
        machine: createdMachines[3]._id, // Electric Arc Furnace #1
        reportedBy: createdUsers[11]._id, // Anna Kowalski
        assignedTo: createdUsers[4]._id, // Mike Rodriguez
        priority: "Critical",
        status: "In Progress",
        category: "Electrical",
        estimatedHours: 8,
        actualHours: 6,
        comments: [
          {
            user: createdUsers[11]._id,
            comment:
              "Temperature readings jumping between 1400°C and 1800°C randomly. Operators concerned about safety.",
            timestamp: new Date("2024-01-29T08:15:00"),
          },
          {
            user: createdUsers[4]._id,
            comment: "Investigating thermocouple connections. Found loose wiring in junction box.",
            timestamp: new Date("2024-01-29T10:30:00"),
          },
          {
            user: createdUsers[4]._id,
            comment: "Replaced faulty thermocouples. Testing system stability.",
            timestamp: new Date("2024-01-29T14:45:00"),
          },
        ],
      },
      {
        title: "Hydraulic System Pressure Loss - Rolling Mill",
        description:
          "Primary rolling mill experiencing gradual hydraulic pressure loss. Production efficiency decreasing.",
        machine: createdMachines[0]._id, // Primary Rolling Mill
        reportedBy: createdUsers[8]._id, // Robert Johnson
        assignedTo: createdUsers[2]._id, // John Mitchell
        priority: "High",
        status: "In Progress",
        category: "Hydraulic",
        estimatedHours: 6,
        actualHours: 4,
        comments: [
          {
            user: createdUsers[8]._id,
            comment: "Pressure dropping from 200 bar to 180 bar over 2-hour period. No visible leaks.",
            timestamp: new Date("2024-01-28T14:20:00"),
          },
          {
            user: createdUsers[2]._id,
            comment: "Checking internal seals and pump efficiency. Suspect worn pump components.",
            timestamp: new Date("2024-01-28T16:00:00"),
          },
        ],
      },

      // High Priority Tickets
      {
        title: "Conveyor Belt Misalignment",
        description: "Main conveyor belt running off-center, causing material spillage and potential safety hazard.",
        machine: createdMachines[16]._id, // Conveyor System #1
        reportedBy: createdUsers[9]._id, // Maria Garcia
        assignedTo: createdUsers[3]._id, // Sarah Chen
        priority: "High",
        status: "Pending",
        category: "Mechanical",
        estimatedHours: 4,
        comments: [
          {
            user: createdUsers[9]._id,
            comment: "Belt started drifting to the left side around 2 PM. Material spillage increasing.",
            timestamp: new Date("2024-01-30T14:30:00"),
          },
        ],
      },
      {
        title: "Casting Machine Cooling System Issue",
        description: "CCM #2 cooling water temperature higher than normal. May affect product quality.",
        machine: createdMachines[9]._id, // Continuous Casting Machine #2
        reportedBy: createdUsers[14]._id, // Thomas Brown
        assignedTo: createdUsers[5]._id, // Emily Watson
        priority: "High",
        status: "Pending",
        category: "Mechanical",
        estimatedHours: 5,
      },

      // Medium Priority Tickets
      {
        title: "X-Ray System Image Quality Degradation",
        description: "X-ray inspection images showing reduced clarity. May need calibration or component replacement.",
        machine: createdMachines[12]._id, // X-Ray Inspection System
        reportedBy: createdUsers[16]._id, // Kevin Zhang
        assignedTo: createdUsers[3]._id, // Sarah Chen
        priority: "Medium",
        status: "Pending",
        category: "Software",
        estimatedHours: 3,
        comments: [
          {
            user: createdUsers[16]._id,
            comment: "Image resolution seems lower than usual. Difficult to detect small defects.",
            timestamp: new Date("2024-01-30T11:00:00"),
          },
        ],
      },
      {
        title: "Ladle Furnace Electrode Wear",
        description: "Electrodes showing excessive wear. Replacement needed soon to maintain efficiency.",
        machine: createdMachines[5]._id, // Ladle Furnace #1
        reportedBy: createdUsers[12]._id, // Carlos Mendez
        priority: "Medium",
        status: "Pending",
        category: "Mechanical",
        estimatedHours: 6,
      },

      // Resolved Tickets
      {
        title: "Hardness Testing Machine Calibration",
        description: "HTM-001 calibration drift detected during routine quality checks.",
        machine: createdMachines[14]._id, // Hardness Testing Machine
        reportedBy: createdUsers[17]._id, // Amanda Taylor
        assignedTo: createdUsers[2]._id, // John Mitchell
        priority: "Medium",
        status: "Resolved",
        category: "Software",
        estimatedHours: 2,
        actualHours: 1.5,
        resolvedAt: new Date("2024-01-25T16:30:00"),
        comments: [
          {
            user: createdUsers[17]._id,
            comment: "Calibration standards showing 5% deviation from expected values.",
            timestamp: new Date("2024-01-25T09:00:00"),
          },
          {
            user: createdUsers[2]._id,
            comment: "Recalibrated using certified standards. System now within tolerance.",
            timestamp: new Date("2024-01-25T16:30:00"),
          },
        ],
      },
      {
        title: "Overhead Crane Limit Switch Replacement",
        description: "Upper limit switch on crane #1 not functioning properly. Safety concern.",
        machine: createdMachines[15]._id, // Overhead Crane #1
        reportedBy: createdUsers[10]._id, // James Wilson
        assignedTo: createdUsers[4]._id, // Mike Rodriguez
        priority: "High",
        status: "Closed",
        category: "Electrical",
        estimatedHours: 3,
        actualHours: 2.5,
        resolvedAt: new Date("2024-01-22T14:00:00"),
        closedAt: new Date("2024-01-23T09:00:00"),
      },

      // Low Priority Tickets
      {
        title: "Ultrasonic Testing Machine Noise",
        description: "UTM-001 making unusual noise during operation. Performance not affected yet.",
        machine: createdMachines[13]._id, // Ultrasonic Testing Machine
        reportedBy: createdUsers[16]._id, // Kevin Zhang
        priority: "Low",
        status: "Pending",
        category: "Mechanical",
        estimatedHours: 2,
      },
    ]

    const createdTickets = await Ticket.insertMany(tickets)
    console.log(`✅ Created ${createdTickets.length} tickets`)

    // Create comprehensive incidents
    console.log("⚠️  Creating incidents...")
    const incidents = [
      // Critical Incidents
      {
        title: "Molten Metal Splash Incident",
        description:
          "Molten metal splash occurred during ladle transfer operation. One operator received minor burns despite PPE.",
        type: "Injury",
        severity: "High",
        location: "Building B - Ladle Transfer Station",
        department: "Smelting",
        reportedBy: createdUsers[11]._id, // Anna Kowalski
        incidentDate: new Date("2024-01-26T15:30:00"),
        involvedPersons: [
          {
            name: "Carlos Mendez",
            role: "Furnace Operator",
            department: "Smelting",
          },
        ],
        witnesses: [
          {
            name: "Anna Kowalski",
            contact: "+1-555-0401",
          },
          {
            name: "Jennifer Lee",
            contact: "+1-555-0403",
          },
        ],
        immediateActions:
          "First aid administered immediately. Operator transported to medical facility. Area secured and operations halted.",
        rootCause:
          "Ladle tilting mechanism malfunction caused unexpected metal splash. PPE adequate but incident severity exceeded protection level.",
        status: "Under Investigation",
        correctiveActions: [
          {
            action: "Inspect and repair ladle tilting mechanism",
            assignedTo: createdUsers[4]._id, // Mike Rodriguez
            dueDate: new Date("2024-02-10"),
            status: "In Progress",
          },
          {
            action: "Review and upgrade PPE requirements for ladle operations",
            assignedTo: createdUsers[6]._id, // David Thompson
            dueDate: new Date("2024-02-15"),
            status: "Pending",
          },
          {
            action: "Install additional splash guards around ladle station",
            assignedTo: createdUsers[5]._id, // Emily Watson
            dueDate: new Date("2024-02-20"),
            status: "Pending",
          },
        ],
      },

      // Near Miss Incidents
      {
        title: "Overhead Crane Load Swing Near Miss",
        description:
          "Heavy load being transported by overhead crane began swinging dangerously close to personnel working below.",
        type: "Near Miss",
        severity: "High",
        location: "Building A - Rolling Mill Bay 1",
        department: "Rolling Mill",
        reportedBy: createdUsers[8]._id, // Robert Johnson
        incidentDate: new Date("2024-01-24T10:15:00"),
        involvedPersons: [
          {
            name: "Maria Garcia",
            role: "Machine Operator",
            department: "Rolling Mill",
          },
          {
            name: "James Wilson",
            role: "Machine Operator",
            department: "Rolling Mill",
          },
        ],
        witnesses: [
          {
            name: "Robert Johnson",
            contact: "+1-555-0301",
          },
        ],
        immediateActions:
          "Crane operation stopped immediately. Area cleared of personnel. Load secured before continuing operation.",
        rootCause:
          "Crane operator did not follow proper load securing procedures. Wind from open bay doors contributed to load swing.",
        status: "Closed",
        closedAt: new Date("2024-01-28T16:00:00"),
        correctiveActions: [
          {
            action: "Mandatory crane operation refresher training for all operators",
            assignedTo: createdUsers[6]._id, // David Thompson
            dueDate: new Date("2024-02-05"),
            status: "Completed",
          },
          {
            action: "Install wind barriers at bay door openings",
            assignedTo: createdUsers[2]._id, // John Mitchell
            dueDate: new Date("2024-02-12"),
            status: "Completed",
          },
        ],
      },
      {
        title: "Chemical Spill Near Miss",
        description:
          "Hydraulic fluid container tipped over during transport, nearly spilling onto electrical equipment.",
        type: "Near Miss",
        severity: "Medium",
        location: "Building C - Maintenance Workshop",
        department: "Maintenance",
        reportedBy: createdUsers[3]._id, // Sarah Chen
        incidentDate: new Date("2024-01-22T13:45:00"),
        involvedPersons: [
          {
            name: "Maintenance Technician",
            role: "Technician",
            department: "Maintenance",
          },
        ],
        witnesses: [
          {
            name: "Sarah Chen",
            contact: "+1-555-0102",
          },
        ],
        immediateActions: "Container secured immediately. Area inspected for any spillage. No contamination occurred.",
        rootCause: "Improper container handling and inadequate securing during transport.",
        status: "Closed",
        closedAt: new Date("2024-01-24T10:00:00"),
        correctiveActions: [
          {
            action: "Implement proper chemical transport procedures",
            assignedTo: createdUsers[7]._id, // Lisa Park
            dueDate: new Date("2024-02-01"),
            status: "Completed",
          },
        ],
      },

      // Property Damage Incidents
      {
        title: "Conveyor Belt Damage",
        description:
          "Conveyor belt suffered significant damage due to oversized material causing belt tear and system shutdown.",
        type: "Property Damage",
        severity: "Medium",
        location: "Building A - Transport Line 1",
        department: "Rolling Mill",
        reportedBy: createdUsers[9]._id, // Maria Garcia
        incidentDate: new Date("2024-01-20T16:20:00"),
        involvedPersons: [
          {
            name: "Line Operator",
            role: "Operator",
            department: "Rolling Mill",
          },
        ],
        immediateActions: "Conveyor system shut down immediately. Area secured. Damaged belt section isolated.",
        rootCause:
          "Oversized material not detected by upstream screening system. Material size exceeded belt design limits.",
        status: "Closed",
        closedAt: new Date("2024-01-25T14:00:00"),
        correctiveActions: [
          {
            action: "Repair conveyor belt and replace damaged sections",
            assignedTo: createdUsers[2]._id, // John Mitchell
            dueDate: new Date("2024-01-23"),
            status: "Completed",
          },
          {
            action: "Upgrade material screening system sensitivity",
            assignedTo: createdUsers[3]._id, // Sarah Chen
            dueDate: new Date("2024-01-30"),
            status: "Completed",
          },
        ],
      },

      // Environmental Incidents
      {
        title: "Dust Emission Exceedance",
        description:
          "Dust collection system malfunction resulted in elevated particulate emissions exceeding environmental limits.",
        type: "Environmental",
        severity: "Medium",
        location: "Building B - Furnace Area",
        department: "Smelting",
        reportedBy: createdUsers[7]._id, // Lisa Park
        incidentDate: new Date("2024-01-18T11:30:00"),
        immediateActions:
          "Dust collection system shut down for inspection. Operations reduced to minimize emissions. Environmental authorities notified.",
        rootCause: "Dust collection filter bags reached end of service life. Replacement schedule not followed.",
        status: "Under Investigation",
        correctiveActions: [
          {
            action: "Replace all dust collection filter bags",
            assignedTo: createdUsers[5]._id, // Emily Watson
            dueDate: new Date("2024-02-05"),
            status: "In Progress",
          },
          {
            action: "Implement preventive filter replacement schedule",
            assignedTo: createdUsers[7]._id, // Lisa Park
            dueDate: new Date("2024-02-10"),
            status: "Pending",
          },
        ],
      },

      // Security Incidents
      {
        title: "Unauthorized Access Attempt",
        description:
          "Security system detected unauthorized access attempt to restricted maintenance area during night shift.",
        type: "Security",
        severity: "Low",
        location: "Building D - Restricted Maintenance Zone",
        department: "Quality Control",
        reportedBy: createdUsers[0]._id, // System Administrator
        incidentDate: new Date("2024-01-19T02:15:00"),
        immediateActions:
          "Security team responded immediately. Area secured. No unauthorized entry occurred. CCTV footage reviewed.",
        rootCause:
          "Employee attempted to retrieve personal items left in restricted area. Proper authorization procedures not followed.",
        status: "Closed",
        closedAt: new Date("2024-01-20T09:00:00"),
        correctiveActions: [
          {
            action: "Remind all staff of proper access authorization procedures",
            assignedTo: createdUsers[1]._id, // Plant Manager
            dueDate: new Date("2024-01-25"),
            status: "Completed",
          },
        ],
      },
    ]

    const createdIncidents = await Incident.insertMany(incidents)
    console.log(`✅ Created ${createdIncidents.length} incidents`)

    console.log("\n🎉 Comprehensive database seeding completed successfully!")
    console.log("\n📊 Final Summary:")
    console.log(`👥 Users: ${createdUsers.length}`)
    console.log(`   - Admins: 2`)
    console.log(`   - Maintenance Engineers: 4`)
    console.log(`   - Safety Officers: 2`)
    console.log(`   - Operators: 9`)
    console.log(`🏭 Machines: ${createdMachines.length}`)
    console.log(`   - Rolling Mill: 4`)
    console.log(`   - Smelting: 4`)
    console.log(`   - Casting: 4`)
    console.log(`   - Quality Control: 3`)
    console.log(`   - Support Equipment: 2`)
    console.log(`📅 Maintenance Schedules: ${createdSchedules.length}`)
    console.log(`   - Scheduled: 6`)
    console.log(`   - In Progress: 1`)
    console.log(`   - Completed: 1`)
    console.log(`   - Overdue: 1`)
    console.log(`🎫 Tickets: ${createdTickets.length}`)
    console.log(`   - Critical: 2`)
    console.log(`   - High: 3`)
    console.log(`   - Medium: 3`)
    console.log(`   - Low: 1`)
    console.log(`⚠️  Incidents: ${createdIncidents.length}`)
    console.log(`   - Injury: 1`)
    console.log(`   - Near Miss: 2`)
    console.log(`   - Property Damage: 1`)
    console.log(`   - Environmental: 1`)
    console.log(`   - Security: 1`)

    console.log("\n🔑 Login Credentials:")
    console.log("System Admin: admin@imsp.com / admin123")
    console.log("Plant Manager: manager@imsp.com / manager123")
    console.log("Maintenance Engineer: john.mitchell@imsp.com / engineer123")
    console.log("Safety Officer: david.thompson@imsp.com / safety123")
    console.log("Rolling Mill Operator: robert.johnson@imsp.com / operator123")
    console.log("Smelting Operator: anna.kowalski@imsp.com / operator123")

    console.log("\n✨ The system is now populated with comprehensive, realistic data!")
    console.log("🚀 Ready for demonstration and testing!")

    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding data:", error)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  seedData()
}

module.exports = seedData
