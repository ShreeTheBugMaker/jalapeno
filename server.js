import express from "express";
import cors from "cors";
import { connectionDB } from "./config/db.js";
import foodrouter from "./routes/foodroute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'; // Load .env variables
import upload from './middleware/uploadMiddleware.js'; // Assuming you have the upload middleware correctly set up
import { addfood, listfood, removefood } from './controllers/foodcontrollers.js';
import cartRouter from "./routes/cartRoute.js";

// App configuration
const app = express();
const port = process.env.PORT || 4000; // Use the port from .env or fallback to 4000

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// DB connection
connectionDB();

// API routes for food items
app.post('/addfood', upload.single('image'), addfood); // Food item upload
app.get('/listfood', listfood); // Get all food items
app.post('/removefood', removefood); // Remove food item

// Modular API endpoints
app.use("/api/food", foodrouter);
app.use("/images", express.static('uploads')); // Serve uploaded images from the "uploads" folder
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);

// Root endpoint for checking API
app.get("/", (req, res) => {
    res.send("API is working");
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
