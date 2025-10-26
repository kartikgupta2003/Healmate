const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        const url = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/HealDB";
        await mongoose.connect(url);
        console.log("MongoDB connected");
    }
    catch(err){
        console.log(`Error ${err}`);
        process.exit(1);
    }
}

module.exports = connectDB;
