import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "../utils/logger.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ---------- REGISTER (USER or ADMIN) ----------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Allow role BUT validate it
    const validRole =
      role && (role === "USER" || role === "ADMIN") ? role : "USER";

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: validRole,
    });

    logger.info(`New user registered: ${email}`);

    res.status(201).json({
      message: "User registered successfully",
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  logger.info("LOGIN ROUTE ENTERED"); 
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    logger.info(`User logged in: ${email}`);

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---- ADMIN: GET ALL USERS ----

router.get("/users", protect, async (req, res) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ error: "Admins only" });
  }

  const users = await User.find({}, "name email _id");
  res.json(users);
});

export default router;
