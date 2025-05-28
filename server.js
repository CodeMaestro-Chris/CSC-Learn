import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ========== Email Verification ==========
const verificationCodes = {};

app.post("/send-code", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  const code = Math.floor(100000 + Math.random() * 900000);
  verificationCodes[email] = code;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: '"CSC Learn" <noreply@csclearn.com>',
      to: email,
      subject: "Your Verification Code",
      html: `
        <h3>Your CSC LEARN verification code:</h3>
        <p><strong style="font-size: 24px;">${code}</strong></p>
        <p>Click the link below to enter your code:</p>
        <a href="http://localhost:8000/verify-code.html?email=${email}" style="padding: 10px 15px; background: orangered; color: white; text-decoration: none; border-radius: 5px;">Verify Code</a>
        <p>If the button doesn't work, copy and paste this into your browser:<br> http://localhost:8000/verify-code.html?email=${email}</p>
      `,
    });

    res.json({ success: true, message: "Email sent" });
  } catch (err) {
    console.error("Mail Error:", err);
    res.status(500).json({ success: false, message: "Error sending email" });
  }
});

app.post("/verify-code", (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ success: false, message: "Email and code required" });

  if (verificationCodes[email] == code) {
    delete verificationCodes[email];
    return res.json({ success: true, message: "✅ Code verified" });
  }

  res.status(400).json({ success: false, message: "❌ Invalid code" });
});

app.listen(8000, () => {
  console.log("API server running at http://localhost:8000");
});
