const resend = require("../config/mailer");

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

    const { data, error } = await resend.emails.send({
      from: "Complaint App <onboarding@resend.dev>",

      // CM email
      to: "aswinsanjay5@gmail.com",

      subject: subject || "New Complaint Received",

      html: `
        <div>
          <p>${complaint}</p>
        </div>
      `,
    });

    // Resend returned an error
    if (error) {
      console.error("Resend error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to send complaint email",
        error: error.message,
      });
    }

    console.log("Email sent successfully:", data);

    return res.status(200).json({
      success: true,
      message: "Complaint email sent successfully",
      data,
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