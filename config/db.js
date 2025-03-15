import mongoose from "mongoose";

export const connectionDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://dhanushree:dhanushree4719@cluster0.xsjgp.mongodb.net/food-del", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // await mongoose.connect("mongodb+srv://dhanushree:dhanushree4719@cluster0.xsjgp.mongodb.net/food-del");

        console.log("DB connected");
    } catch (err) {
        console.error("Error connecting to DB: ", err);
    }
};
