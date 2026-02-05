import express from "express";
import Task from "../models/Task.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/roleMiddleware.js";

const router = express.Router();

// -------- CREATE TASK (USER or ADMIN) --------
router.post("/", protect, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
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

    // Allow only owner OR admin
    if (task.user.toString() !== req.user.id && req.user.role !== "ADMIN") {
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
      return res.status(404).json({ error: "Task not found" });
    }

    // Allow only owner OR admin
    if (task.user.toString() !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ error: "Not allowed" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
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
