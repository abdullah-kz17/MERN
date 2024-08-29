const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Initialize upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, // 2MB limit per file
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Export single and multiple upload functions
const uploadSingle = upload.single("image");
const uploadMultiple = upload.array("images", 10); // Limit to 10 files

module.exports = { uploadSingle, uploadMultiple };
