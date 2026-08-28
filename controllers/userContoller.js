const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const getAllUsers = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
  const { ward, search } = req.query;

const filter = { role: "citizen" }
  if (ward) filter.ward = ward;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ];
  }

  const total = await User.countDocuments(filter);
  const users = await User.find(filter)
    .populate("ward", "name number")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    success: true,
    data: users,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
});

const updateSettings = asyncHandler(async (req, res) => {
  const { preferredLanguage } = req.body;
  if (!["en", "ta"].includes(preferredLanguage)) {
    res.status(400);
    throw new Error("preferredLanguage must be 'en' or 'ta'");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { preferredLanguage },
    { new: true, runValidators: true }
  ).populate("ward", "name number");

  res.json({ success: true, data: user });
});

module.exports = { getAllUsers, updateSettings };