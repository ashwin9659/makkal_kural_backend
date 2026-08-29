const transporter = require("../config/mailer");

const sendComplaintEmail = async (req, res) => {
  try {
    const { subject, complaint } = req.body;

    // Validate required fields
    if (!subject || !complaint) {
      return res.status(400).json({
        success: false,
        message: "Subject and complaint are required",
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,

      // 👇 Change this to the email where you want complaints
      to: "aswinsanjay5@gmail.com",

      subject: subject || "New Complaint Received",

      html: `<p>${complaint}</p>`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Complaint email sent successfully",
    });

  } catch (error) {
    console.error("Email sending error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send complaint email",
      error: error.message,
    });
  }
};

module.exports = {
  sendComplaintEmail,
};