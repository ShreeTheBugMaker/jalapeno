import mongoose from "mongoose";
import bcrypt from "bcrypt"; // Import bcrypt for hashing passwords

// Define the user schema
const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true // Ensure unique email addresses
    },
    password: { 
        type: String, 
        required: true 
    },
    cartData: { 
        type: Object, 
        default: {} // Default to an empty object if no cart data provided
    }
}, { minimize: false }); // `minimize: false` prevents empty objects from being removed



// Create or reuse the model
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
