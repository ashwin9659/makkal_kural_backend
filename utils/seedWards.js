// Run with: npm run seed:wards
// Edit the list below to match your actual ward numbers/names, then run once.
require("dotenv").config();
const connectDB = require("../config/db");
const Ward = require("../models/Ward");
const mongoose = require("mongoose");

const wards = [
  { number: 1, name: "Ward 1" },
  { number: 2, name: "Ward 2" },
  { number: 3, name: "Ward 3" },
  { number: 4, name: "Ward 4" },
  { number: 5, name: "Ward 5" },
  { number: 6, name: "Ward 6" },
  { number: 7, name: "Ward 7" },
  { number: 8, name: "Ward 8" },
  { number: 9, name: "Ward 9" },
  { number: 10, name: "Ward 10" },
  { number: 11, name: "Ward 11" },
  { number: 12, name: "Ward 12" },
  { number: 13, name: "Ward 13" },
  { number: 14, name: "Ward 14" },
  { number: 15, name: "Ward 15" },
];

const run = async () => {
  await connectDB();
  await Ward.deleteMany({});
  await Ward.insertMany(wards);
  console.log(`Seeded ${wards.length} wards`);
  await mongoose.disconnect();
  process.exit(0);
};

run();
