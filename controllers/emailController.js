const brevo = require("../config/mailer");

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

    const result = await brevo.transactionalEmails.sendTransacEmail({
      sender: {
        name: "Complaint App",
        email: process.env.BREVO_SENDER_EMAIL,
      },

      to: [
        {
          email: "aswinsanjay5@gmail.com",
        },
      ],

      subject: subject,

      htmlContent: `
        <html>
          <body>
            <h3>${subject}</h3>

            <p>${complaint}</p>
          </body>
        </html>
      `,

      textContent: complaint,
    });

    console.log("Brevo email sent successfully:", result);

    return res.status(200).json({
      success: true,
      message: "Complaint email sent successfully",
      messageId: result.messageId,
    });

  } catch (error) {
    console.error("Brevo email sending error:", error);

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