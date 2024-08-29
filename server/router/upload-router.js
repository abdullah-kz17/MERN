const express = require("express");
const router = express.Router();
const {
  uploadSingle,
  uploadMultiple,
} = require("../middleware/upload-middleware");
const {
  uploadSingleFile,
  uploadMultipleFiles,
} = require("../controllers/upload-controller");
const authMiddleware = require("../middleware/auth-middleware");

// POST /api/upload/single
router.post("/single", authMiddleware, uploadSingle, uploadSingleFile);

// POST /api/upload/multiple
router.post("/multiple", authMiddleware, uploadMultiple, uploadMultipleFiles);

module.exports = router;
