const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Makkal Kural - Privacy Policy</title>

      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
          background: #f5f5f5;
          color: #222;
        }

        .container {
          max-width: 850px;
          margin: 30px auto;
          background: #fff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        }

        h1 {
          color: #b8860b;
          margin-bottom: 10px;
        }

        h2 {
          margin-top: 25px;
          color: #333;
        }

        p {
          margin: 10px 0;
        }

        ul {
          padding-left: 25px;
        }

        .updated {
          color: #666;
          font-size: 14px;
        }
      </style>
    </head>

    <body>
      <div class="container">

       <h1>Privacy Policy</h1>

<p class="updated">
  Last updated: October 2026
</p>

<h2>1. App and Developer Information</h2>

<p>
  <strong>App Name:</strong> Makkal Kural<br />
  <strong>Developer Name:</strong> Team AKS<br />
  <strong>Legal Name:</strong> ASHWIN SANJAY MURUGESAN<br />
  <strong>Contact Email:</strong> aswinsanjay5@gmail.com<br />
  <strong>Location:</strong> Kottaram, Kanyakumari, Tamil Nadu, India
</p>

<p>
  Makkal Kural is developed and maintained by
  <strong>Team AKS</strong>.
</p>

<p>
  This Privacy Policy explains how information is collected, used,
  stored, and protected when you use the Makkal Kural application.
</p>

        <p>
          Welcome to <strong>Makkal Kural</strong>. We respect your privacy
          and are committed to protecting your personal information.
          This Privacy Policy explains how information is collected,
          used, stored, and protected when you use the Makkal Kural app.
        </p>

        <h2>2. Information We Collect</h2>

        <p>
          When you create and use an account, we may collect information
          such as:
        </p>

        <ul>
          <li>Name</li>
          <li>Phone number</li>
          <li>Email address, if provided</li>
          <li>User account ID</li>
          <li>Profile information</li>
          <li>Photos that you choose to upload through the app</li>
        </ul>

        <h2>3. How We Use Your Information</h2>

        <p>
          The information collected may be used to:
        </p>

        <ul>
          <li>Create and manage your account</li>
          <li>Authenticate your account and provide login functionality</li>
          <li>Provide features and services available in the app</li>
          <li>Process requests or complaints submitted through the app</li>
          <li>Maintain and improve the security and functionality of the app</li>
        </ul>

        <h2>4. Photos and Camera</h2>

        <p>
          The app may request access to your camera or photos when a feature
          requires you to take or upload an image. Photos are used only for
          the functionality for which you choose to provide them.
        </p>

        <h2>5. Data Storage and Security</h2>

        <p>
          Your account information and other information submitted through
          the app may be transmitted to and stored on our backend servers.
          We take reasonable measures to protect your information from
          unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2>6. Data Sharing</h2>

        <p>
          We do not sell your personal information.
          We do not share your personal information with third parties
          for advertising purposes.
        </p>

        <p>
          Information may be disclosed when necessary to comply with
          applicable laws, legal processes, or to protect the security
          and integrity of the service.
        </p>

        <h2>7. Data Retention</h2>

        <p>
          We retain personal information for as long as necessary to
          provide the services, maintain user accounts, comply with
          legal obligations, resolve disputes, and enforce our agreements.
        </p>

        <h2>8. Account Deletion</h2>

        <p>
          Users can request deletion of their account and associated
          personal information by using the account deletion process
          provided by Makkal Kural.
        </p>

        <p>
          Account deletion requests may require verification to protect
          the account from unauthorized deletion.
        </p>

        <h2>9. Children's Privacy</h2>

        <p>
          Makkal Kural is not specifically directed toward children.
          We do not knowingly collect personal information from children
          without appropriate consent.
        </p>

        <h2>10. Changes to This Privacy Policy</h2>

        <p>
          We may update this Privacy Policy from time to time.
          Any changes will be published on this page with an updated
          revision date.
        </p>

        <h2>11. Contact Us</h2>

   <p>
  If you have questions about this Privacy Policy or your personal
  information, please contact the developer:
</p>

<p>
  <strong>Makkal Kural</strong><br />
  <strong>Developer:</strong> Team AKS<br />
  <strong>Legal Name:</strong> ASHWIN SANJAY MURUGESAN<br />
  Kottaram, Kanyakumari, Tamil Nadu, India<br />
  <strong>Email:</strong> aswinsanjay5@gmail.com
</p>

      </div>
    </body>
    </html>
  `);
});

module.exports = router;
