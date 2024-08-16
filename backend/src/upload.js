const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('./config/database');
const logger = require('./logger');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

const handleFileUpload = async (req, res) => {
  try {
    if (!req.file) {
      logger.warn('No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { originalname, filename, path: filePath } = req.file;

    const [result] = await pool.query(
      'INSERT INTO files (filename, filepath, upload_date) VALUES (?, ?, ?)', 
      [originalname, filename, new Date()]
    );

    logger.info(`File uploaded successfully: ${originalname}, File ID: ${result.insertId}`);

    res.status(200).json({
      message: 'File uploaded successfully',
      fileId: result.insertId,
      fileName: originalname,
      filePath: filePath
    });
  } catch (error) {
    logger.error('Error uploading file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { upload, handleFileUpload };
