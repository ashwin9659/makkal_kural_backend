const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Makkal Kural - Child Safety Standards</title>

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
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }

        h1 {
          color: #b8860b;
          margin-bottom: 10px;
        }

        h2 {
          margin-top: 28px;
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

        .contact {
          background: #f8f8f8;
          padding: 15px;
          border-radius: 8px;
          margin-top: 15px;
        }
      </style>
    </head>

    <body>
      <div class="container">

        <h1>Child Safety Standards</h1>

        <p class="updated">
          Last updated: September 2026
        </p>

        <p>
          <strong>மக்கள் குரல் (Makkal Kural)</strong> is committed to
          maintaining a safe environment for all users and has zero
          tolerance for child sexual abuse and exploitation (CSAE).
        </p>

        <h2>1. Zero Tolerance for Child Sexual Abuse and Exploitation</h2>

        <p>
          Makkal Kural strictly prohibits child sexual abuse,
          child sexual exploitation, child sexual abuse material (CSAM),
          grooming, sexualization of minors, and any other content or
          behavior that exploits or harms children.
        </p>

        <p>
          Users must not create, upload, request, distribute, share,
          or promote any CSAM or sexually exploitative content involving
          minors through the app.
        </p>

        <h2>2. User Safety</h2>

        <p>
          We take child safety concerns seriously. Content or behavior
          that violates applicable child-safety laws or these standards
          may be reviewed and appropriate action may be taken.
        </p>

        <p>
          Depending on the circumstances, action may include removing
          content, restricting or suspending accounts, and reporting
          unlawful activity to the appropriate authorities where required.
        </p>

        <h2>3. Reporting Child Safety Concerns</h2>

        <p>
          Users can report child-safety concerns through the reporting
          mechanism provided within the Makkal Kural app.
        </p>

        <p>
          Reports should include enough information to help us understand
          and investigate the concern, such as the relevant account,
          content, or activity.
        </p>

        <h2>4. Handling of Reports</h2>

        <p>
          Reports concerning child safety are treated seriously and may
          be reviewed to determine whether the reported content or
          behavior violates our standards or applicable law.
        </p>

        <p>
          Appropriate action may be taken based on the nature and
          severity of the report.
        </p>

        <h2>5. Cooperation with Authorities</h2>

        <p>
          Where required by applicable law, Makkal Kural may cooperate
          with relevant law-enforcement or governmental authorities
          regarding reports or suspected cases of child sexual abuse
          and exploitation.
        </p>

        <h2>6. Prohibited Content and Behavior</h2>

        <p>
          The following are strictly prohibited:
        </p>

        <ul>
          <li>Child sexual abuse material (CSAM)</li>
          <li>Sexual exploitation of minors</li>
          <li>Sexual grooming of minors</li>
          <li>Sexualized content involving minors</li>
          <li>Requests for or distribution of CSAM</li>
          <li>Any activity that facilitates child sexual exploitation</li>
        </ul>

        <h2>7. Contact for Child Safety Concerns</h2>

        <p>
          For questions or concerns regarding child safety, suspected
          CSAM, or child sexual exploitation, please contact our
          designated contact:
        </p>

        <div class="contact">
          <strong>Makkal Kural</strong><br />
          Kottaram Perur<br />
          Email:
          <a href="mailto:aswinsanjay5@gmail.com">
            aswinsanjay5@gmail.com
          </a>
        </div>

        <h2>8. Changes to These Standards</h2>

        <p>
          These Child Safety Standards may be updated from time to time
          to reflect changes in our services, applicable laws, or safety
          practices. Updated standards will be published on this page.
        </p>

      </div>
    </body>
    </html>
  `);
});

module.exports = router;
