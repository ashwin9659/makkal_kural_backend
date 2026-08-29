const express = require("express");
const router = express.Router();
const { sendComplaintEmail } = require("../controllers/emailController");

router.post("/send-complaint-email", sendComplaintEmail);

module.exports = router;