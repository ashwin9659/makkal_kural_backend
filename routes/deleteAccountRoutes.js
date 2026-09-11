const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Delete Makkal Kural Account</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 700px;
            margin: 50px auto;
            padding: 20px;
            line-height: 1.6;
            color: #222;
          }

          h1 {
            color: #111;
          }

          .box {
            background: #f5f5f5;
            padding: 20px;
            border-radius: 10px;
          }
        </style>
      </head>

      <body>
        <h1>Makkal Kural – Account Deletion</h1>

        <div class="box">
          <p>
            If you want to delete your Makkal Kural account and associated
            personal data, please contact us using the email address below.
          </p>

          <p>
            Please include your registered mobile number or email address
            in your request.
          </p>

          <p>
            We will review and process your account deletion request.
          </p>

          <h3>Data deletion</h3>

          <p>
            Account information and personal profile data associated with
            your account will be deleted when your request is processed.
          </p>

          <h3>Request account deletion</h3>

          <p>
            Email us at:
            <a href="mailto:aswinsanjay5@gmail.com">
              aswinsanjay5@gmail.com
            </a>
          </p>
        </div>
      </body>
    </html>
  `);
});

module.exports = router;
