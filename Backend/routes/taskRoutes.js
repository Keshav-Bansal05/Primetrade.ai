import express from "express";
import Task from "../models/Task.js";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";
import logger from "../utils/logger.js";

const router = express.Router();

// -------- CREATE TASK (USER or ADMIN) --------
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    let assignedUserId = req.user.id; // default = logged-in user

    // ✅ If ADMIN selected a user from dropdown → use that userId
    if (req.user.role === "ADMIN" && userId) {
      const targetUser = await User.findById(userId);

      if (!targetUser) {
        return res.status(404).json({ error: "User not found" });
      }

      assignedUserId = targetUser._id;

      logger.info(
        `Admin ${req.user.id} assigned task to user ${assignedUserId}`
      );
    }

    const task = await Task.create({
      title,
      description,
      user: assignedUserId,
    });

    logger.info(`Task created by user ${req.user.id}`);

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    logger.error(`Task creation failed: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// -------- GET TASKS --------
// USER -> only their tasks
// ADMIN -> all tasks
router.get("/", protect, async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "ADMIN") {
      tasks = await Task.find().populate("user", "name email role");
    } else {
      tasks = await Task.find({ user: req.user.id });
    }

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------- UPDATE TASK --------
router.put("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const isOwner = task.user.toString() === req.user.id;
    const isAdminUser = req.user.role === "ADMIN";

    if (!isOwner && !isAdminUser) {
      return res.status(403).json({ error: "Not allowed" });
    }

    task.title = req.body.title ?? task.title;
    task.description = req.body.description ?? task.description;

    if (req.body.completed !== undefined) {
      task.completed = req.body.completed;
    }

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------- DELETE TASK --------
router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      logger.warn(`Delete attempt on missing task: ${req.params.id}`);
      return res.status(404).json({ error: "Task not found" });
    }

    const isOwner = task.user.toString() === req.user.id;
    const isAdminUser = req.user.role === "ADMIN";

    if (!isOwner && !isAdminUser) {
      logger.warn(
        `Unauthorized delete attempt by user ${req.user.id} on task ${req.params.id}`
      );
      return res.status(403).json({ error: "Not allowed" });
    }

    await task.deleteOne();

    logger.info(
      `Task deleted: ${req.params.id} by user ${req.user.id}`
    );

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    logger.error(`Task delete failed: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

// -------- OPTIONAL: ADMIN-ONLY ENDPOINT --------
router.get("/admin/all", protect, isAdmin, async (req, res) => {
  try {
    const tasks = await Task.find().populate("user", "name email role");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
