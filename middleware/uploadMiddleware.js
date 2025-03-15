import multer from "multer";
import path from "path";

// Set storage options for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Store uploaded files in the "uploads" directory
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Get file extension
        cb(null, `${Date.now()}${ext}`); // Save file with a unique timestamp
    }
});

// File filter to accept only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type, only JPG, JPEG, and PNG are allowed'), false); // Reject the file
    }
};

// Initialize multer with storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

export default upload;
