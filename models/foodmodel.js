import mongoose from "mongoose";

// Define the food schema
const foodschema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Food name is required'],
    },
    description: { 
        type: String, 
        required: [true, 'Food description is required'],
    },
    price: { 
        type: Number, 
        required: [true, 'Food price is required'],
        min: [0, 'Price must be a positive number'],  // Ensure price is non-negative
    },
    image: { 
        type: String, 
        required: [true, 'Image file is required'] 
    },
    category: { 
        type: String, 
        required: [true, 'Category is required'],
        enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'], // Predefined categories
    }
});

// Add an index to the category field for better query performance
foodschema.index({ category: 1 });

// Create or reuse the model
const foodmodel = mongoose.models.food || mongoose.model("food", foodschema);

export default foodmodel;
