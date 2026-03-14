import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import { OAuth2Client } from "google-auth-library";

import User from "../models/user.js";
import Otp from "../models/Otp.js";
import { generateOTP, hashOTP } from "../utils/otp.js";

const router = express.Router();

/* ================= GOOGLE CLIENT ================= */
const googleClient = new OAuth2Client(
  "192818920134-btagci97kjs33o5pjfpi380urt5a4c88.apps.googleusercontent.com"
);

const resend = new Resend(process.env.RESEND_API_KEY);

/* ================= SEND OTP (SIGNUP) ================= */
router.post("/signup/send-otp", async (req, res) => {
  try {
    const { contact } = req.body;

    if (!contact) {
      return res.status(400).json({ msg: "Email required" });
    }

    const exists = await User.findOne({ email: contact });
    if (exists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const otp = generateOTP();
    const otpHash = hashOTP(otp);

    await Otp.deleteMany({ contact });

    await Otp.create({
      contact,
      otpHash,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // Increased to 10 mins
    });

    console.log(`[AUTH] Attempting OTP send to ${contact} via Resend.`);

    try {
      await resend.emails.send({
        from: "MarketZen <onboarding@resend.dev>",
        to: contact,
        subject: "Signup OTP",
        html: `<p>Your OTP is <strong>${otp}</strong>. Valid for 10 minutes.</p>`,
      });
      console.log(`[AUTH] OTP sent successfully to ${contact} via Resend`);
    } catch (mailErr) {
      console.error("🔥 Resend API failed:", mailErr.message);
      return res.status(500).json({ 
        msg: "Failed to send OTP via Resend API",
        error: mailErr.message 
      });
    }

    res.json({ msg: "OTP sent successfully" });
  } catch (err) {
    console.error("🔥 Internal Server Error:", err);
    res.status(500).json({ msg: "OTP failed", error: err.message });
  }
});

/* ================= VERIFY OTP + SIGNUP ================= */
router.post("/signup/verify-otp", async (req, res) => {
  try {
    const { name, contact, password, otp, role } = req.body;

    if (!name || !contact || !password || !otp) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const record = await Otp.findOne({ contact });

    if (!record) {
      console.log(`[AUTH] No OTP record found for ${contact}`);
      return res.status(400).json({ msg: "Invalid OTP (No record)" });
    }

    if (record.expiresAt < new Date()) {
      console.log(`[AUTH] OTP expired for ${contact}. Expired at: ${record.expiresAt}`);
      return res.status(400).json({ msg: "OTP expired" });
    }

    if (hashOTP(otp) !== record.otpHash) {
      console.log(`[AUTH] Hash mismatch for ${contact}.`);
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const allowedRoles = ["customer", "admin", "manager", "vendor"];
    const finalRole = allowedRoles.includes(role) ? role : "customer";

    await User.create({
      name,
      email: contact,
      password: hashedPassword,
      isVerified: true,
      provider: "local",
      role: finalRole,
    });

    await Otp.deleteOne({ contact });

    res.json({ msg: "Signup successful" });
  } catch (err) {
    console.error("🔥 Signup Error:", err);
    res.status(500).json({ msg: "Signup failed", error: err.message });
  }
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ msg: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ msg: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      msg: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("🔥 Login Error:", err);
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
});

/* ================= GOOGLE LOGIN ================= */
router.post("/google", async (req, res) => {
  try {
    const { token, role } = req.body;

    if (!token) {
      return res.status(400).json({ msg: "Token missing" });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: "192818920134-btagci97kjs33o5pjfpi380urt5a4c88.apps.googleusercontent.com",
    });

    const { email, name, picture } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      const allowedRoles = ["customer", "admin", "manager", "vendor"];
      const finalRole = allowedRoles.includes(role) ? role : "customer";

      user = await User.create({
        name,
        email,
        avatar: picture,
        isVerified: true,
        provider: "google",
        role: finalRole,
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      msg: "Google login successful",
      token: jwtToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("🔥 Google Auth Error:", err);
    res.status(401).json({ msg: "Google authentication failed" });
  }
});

/* ================= FORGOT PASSWORD – SEND OTP ================= */
router.post("/forgot-password/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const otp = generateOTP();
    const otpHash = hashOTP(otp);

    await Otp.deleteMany({ contact: email });

    await Otp.create({
      contact: email,
      otpHash,
      expiresAt: new Date(Date.now() + 2 * 60 * 1000),
    });

    console.log(`[AUTH] Attempting Password Reset OTP to ${email} via Resend.`);

    try {
      await resend.emails.send({
        from: "MarketZen <onboarding@resend.dev>",
        to: email,
        subject: "Reset Password OTP",
        html: `<p>Your OTP is <strong>${otp}</strong>. Valid for 2 minutes.</p>`,
      });
      console.log(`[AUTH] Reset OTP sent successfully to ${email} via Resend`);
    } catch (mailErr) {
      console.error("🔥 Resend API failed:", mailErr.message);
      return res.status(500).json({ 
        msg: "Failed to send Reset OTP via Resend API",
        error: mailErr.message 
      });
    }

    res.json({ msg: "OTP sent to email" });
  } catch (err) {
    console.error("🔥 Forgot Password Error:", err);
    res.status(500).json({ msg: "OTP failed", error: err.message });
  }
});

/* ================= VERIFY OTP + RESET PASSWORD ================= */
router.post("/forgot-password/verify-otp", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const record = await Otp.findOne({ contact: email });

    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({ msg: "OTP expired" });
    }

    if (hashOTP(otp) !== record.otpHash) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await User.updateOne(
      { email },
      { password: hashed }
    );

    await Otp.deleteOne({ contact: email });

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    console.error("🔥 Reset Password Error:", err);
    res.status(500).json({ msg: "Password reset failed", error: err.message });
  }
});

/* ================= GET CURRENT USER ================= */
router.get("/me", async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ msg: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) return res.status(404).json({ msg: "User not found" });
    
    res.json(user);
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
});

export default router;
