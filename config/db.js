const mongoose = require("mongoose");
const dns = require("dns");

// Use Google DNS for MongoDB SRV lookup
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:");
    console.error(error.message);

    process.exit(1);
  }
};

module.exports = connectDB;