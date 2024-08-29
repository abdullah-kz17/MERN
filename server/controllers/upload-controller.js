// Single file upload
const uploadSingleFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.status(200).json({
    message: "File uploaded successfully",
    filePath: `/${req.file.path}`,
  });
};

// Multiple file uploads
const uploadMultipleFiles = (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const filePaths = req.files.map((file) => `/${file.path}`);

  res.status(200).json({
    message: "Files uploaded successfully",
    filePaths,
  });
};

module.exports = { uploadSingleFile, uploadMultipleFiles };
