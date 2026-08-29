const dns = require("dns");
const nodemailer = require("nodemailer");

// Force Node.js to prefer IPv4
dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",

  // Gmail STARTTLS
  port: 587,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  // Force IPv4 - important for Render
  family: 4,

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,

  requireTLS: true,
});

module.exports = transporter;