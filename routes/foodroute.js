import express from "express";
import { addfood, listfood, removefood } from "../controllers/foodcontrollers.js";
import multer from "multer";

const foodrouter = express.Router();

// Image Storage Configuration for multer
const storage = multer.diskStorage({
    destination: "uploads", // Where the files will be saved
    filename: (req, file, cb) => {
        // Setting the filename to be the current timestamp followed by the original file name
        return cb(null, `${Date.now()}${file.originalname}`);
    },
});

// File Validation (file type and size)
const uploads = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/; // Allowed file types
        const extname = filetypes.test(file.originalname.toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true); // Accept file
        } else {
            cb(new Error('Only image files are allowed.')); // Reject file if not an image
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // Max size: 5MB
});

// Route to add food item (including image upload)
foodrouter.post("/add", uploads.single("image"), addfood);

// Route to list all food items
foodrouter.get("/list", listfood);

// Route to remove a food item
foodrouter.post("/remove", removefood);

export default foodrouter;
