const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")


const authRoutes = require("./routes/auth")
const machineRoutes = require("./routes/machines")
const ticketRoutes = require("./routes/tickets")
const incidentRoutes = require("./routes/incidents")
const maintenanceRoutes = require("./routes/maintenance")
const analyticsRoutes = require("./routes/analytics")
const uploadRoutes = require("./routes/upload") // Add upload routes

dotenv.config()

const app = express()

// Middleware
app.use(cors({
  origin: "https://safety-management-f.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],  
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/imsp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"))
db.once("open", () => {
  console.log("Connected to MongoDB")
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/machines", machineRoutes)
app.use("/api/tickets", ticketRoutes)
app.use("/api/incidents", incidentRoutes)
app.use("/api/maintenance", maintenanceRoutes)
app.use("/api/analytics", analyticsRoutes)
app.use("/api/upload", uploadRoutes) // Add upload routes

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "IMSP API is running!" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})