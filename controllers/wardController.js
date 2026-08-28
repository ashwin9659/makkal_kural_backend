const asyncHandler = require("express-async-handler");
const Ward = require("../models/Ward");

// @desc    Get all wards (for the registration dropdown)
// @route   GET /api/wards
// @access  Public
const getWards = asyncHandler(async (req, res) => {
  const wards = await Ward.find().sort({ number: 1 });
  res.json({ success: true, data: wards });
});

module.exports = { getWards };
