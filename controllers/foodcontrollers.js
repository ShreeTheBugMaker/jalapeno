import { privateDecrypt } from "crypto";
import foodmodel from "../models/foodmodel.js";
import fs from 'fs'

// Add food item
const addfood = async (req, res) => {
    // Ensure file is uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No image file uploaded" });
    }

    let image_filename = `${req.file.filename}`;

    const food = new foodmodel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename, // Ensure this matches the field name in your foodmodel
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food added" });
    } catch (error) {
        console.error("Error adding food: ", error);
        res.status(500).json({ success: false, message: "Failed to add food item" });
    }
};

// Get all food items
const listfood = async (req, res) => {
    try {
        const foods = await foodmodel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error("Error fetching food list: ", error);
        res.status(500).json({ success: false, message: "Failed to retrieve food items" });
    }
};

// Remove food item
const removefood = async (req, res) => {
    try {
        const food = await foodmodel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        // Only attempt to delete the image if it exists
        const imagePath = `uploads/${food.image}`;
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting image file: ", err);
                }
            });
        }

        await foodmodel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food item removed" });
    } catch (error) {
        console.error("Error removing food item: ", error);
        res.status(500).json({ success: false, message: "Failed to remove food item" });
    }
};

export { addfood, listfood, removefood };
