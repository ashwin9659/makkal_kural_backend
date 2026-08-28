const asyncHandler = require("express-async-handler");
const Complaint = require("../models/Complaint");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const User = require("../models/User");
const Ward = require("../models/Ward");

const createComplaint = asyncHandler(async (req, res) => {
  const { category, subCategory, description, photos } = req.body;

  const categoryDoc = await Category.findById(category);
  if (!categoryDoc) { res.status(400); throw new Error("Selected category is invalid"); }

  const isOtherCategory = ["other", "others"].includes(categoryDoc.name.trim().toLowerCase());
  if (!isOtherCategory) {
    const subCategoryDoc = await SubCategory.findById(subCategory);
    if (!subCategoryDoc || String(subCategoryDoc.category) !== String(category)) {
      res.status(400);
      throw new Error("Selected sub-category is invalid for this category");
    }
  }

  if (!req.user.ward) { res.status(400); throw new Error("Your account has no ward set - please contact support"); }

  const complaint = await Complaint.create({
    user: req.user._id,
    ward: req.user.ward,
    category,
    ...(isOtherCategory ? {} : { subCategory }),
    description,
    photos: Array.isArray(photos) ? photos : [],
  });

  res.status(201).json({ success: true, data: complaint });
});

const getMyComplaints = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({ user: req.user._id })
    .populate("category", "name")
    .populate("subCategory", "name")
    .sort({ createdAt: -1 });

  res.json({ success: true, data: complaints });
});

const getComplaintStats = asyncHandler(async (req, res) => {
  const complaintFilter = req.user.role === "admin" ? {} : { user: req.user._id };
  const resolvedFilter = { ...complaintFilter, status: { $in: ["Completed", "Rejected"] } };
  const pendingFilter = { ...complaintFilter, status: "In Progress" };

  const [totalComplaints, totalResolved, totalPending] = await Promise.all([
    Complaint.countDocuments(complaintFilter),
    Complaint.countDocuments(resolvedFilter),
    Complaint.countDocuments(pendingFilter),
  ]);

  const stats = { totalComplaints, totalResolved, totalPending };
  if (req.user.role === "admin") {
    stats.totalUsers = await User.countDocuments({ role: "citizen" });
  }

  const wardFilter = req.user.role === "admin" ? {} : { _id: req.user.ward };
  const [wards, wardComplaintStats] = await Promise.all([
    Ward.find(wardFilter).select("number name").sort({ number: 1 }).lean(),
    Complaint.aggregate([
      ...(req.user.role === "admin" ? [] : [{ $match: { ward: req.user.ward } }]),
      {
        $group: {
          _id: "$ward",
          totalComplaints: { $sum: 1 },
          totalResolved: {
            $sum: { $cond: [{ $in: ["$status", ["Completed", "Rejected"]] }, 1, 0] },
          },
          totalPending: { $sum: { $cond: [{ $eq: ["$status", "In Progress"] }, 1, 0] } },
        },
      },
    ]),
  ]);

  const wardStatsById = new Map(wardComplaintStats.map((item) => [String(item._id), item]));
  const wardSnapshots = wards.map((ward) => {
    const counts = wardStatsById.get(String(ward._id)) || {};
    return {
      wardId: ward._id,
      wardNumber: ward.number,
      wardName: ward.name,
      totalComplaints: counts.totalComplaints || 0,
      totalResolved: counts.totalResolved || 0,
      totalPending: counts.totalPending || 0,
    };
  });

  stats.wardSnapshot = req.user.role === "admin" ? wardSnapshots : wardSnapshots[0] || null;

  res.json({ success: true, data: stats });
});

const getAllComplaints = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 20, 1), 100);
  const { ward, status, name } = req.query;

  const filter = {};
  if (ward) filter.ward = ward;
  if (status) filter.status = status;

  if (name) {
    const User = require("../models/User");
    const matchingUsers = await User.find({ name: { $regex: name, $options: "i" } }).select("_id");
    filter.user = { $in: matchingUsers.map((u) => u._id) };
  }

  const total = await Complaint.countDocuments(filter);

  const complaints = await Complaint.find(filter)
    .populate("user", "name phone")
    .populate("ward", "name number")
    .populate("category", "name")
    .populate("subCategory", "name")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({
    success: true,
    data: complaints,
    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
  });
});

const updateComplaintStatus = asyncHandler(async (req, res) => {
  const { status, adminRemarks } = req.body;

if (!["Pending", "Received", "In Progress", "Completed", "Rejected"].includes(status)) {
  res.status(400);
  throw new Error("Status must be one of Pending, Received, In Progress, Completed, Rejected");
}

  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) { res.status(404); throw new Error("Complaint not found"); }

  complaint.status = status;
  if (typeof adminRemarks === "string") complaint.adminRemarks = adminRemarks;

  await complaint.save();
  res.json({ success: true, data: complaint });
});

module.exports = { createComplaint, getMyComplaints, getComplaintStats, getAllComplaints, updateComplaintStatus };