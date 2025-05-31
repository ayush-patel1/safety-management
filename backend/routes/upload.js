const express = require("express")
const upload = require("../middlewares/upload")
const { auth } = require("../middlewares/auth")
const cloudinary = require("../utils/cloudinary")

const router = express.Router()

// Upload single file
router.post("/single", auth, upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" })
    }

    res.json({
      message: "File uploaded successfully",
      file: {
        url: req.file.path, // Cloudinary URL
        public_id: req.file.filename,
        original_name: req.file.originalname,
        size: req.file.size,
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Upload multiple files
router.post("/multiple", auth, upload.array("files", 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" })
    }

    const files = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
      original_name: file.originalname,
      size: file.size,
    }))

    res.json({
      message: "Files uploaded successfully",
      files: files,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete file
router.delete("/:public_id", auth, async (req, res) => {
  try {
    const { public_id } = req.params

    const result = await cloudinary.uploader.destroy(public_id)

    if (result.result === "ok") {
      res.json({ message: "File deleted successfully" })
    } else {
      res.status(404).json({ message: "File not found" })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
