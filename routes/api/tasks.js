var express = require("express");
var router = express.Router();

const db = require("./../../config/db");

// GET all tasks
router.get("/tasks", async function (req, res) {
    try {
        const tasks = await db.getTasks();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Error fetching tasks" });
    }
});

// POST a new task
router.post("/tasks", async function (req, res) {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    try {
        const newTask = await db.addTask(name);
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: "Error creating task" });
    }
});

// PUT update a task
router.put("/tasks/:id", async function (req, res) {
    const { id } = req.params;
    const { name, completed } = req.body;
    if (!name && completed === undefined) {
        return res.status(400).json({ error: "Name or completed is required" });
    }
    try {
        const updatedTask = await db.updateTask(parseInt(id), name, completed);
        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: "Error updating task" });
    }
});

// DELETE a task
router.delete("/tasks/:id", async function (req, res) {
    const { id } = req.params;
    try {
        const deletedTask = await db.deleteTask(parseInt(id));
        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(deletedTask);
    } catch (err) {
        res.status(500).json({ error: "Error deleting task" });
    }
});

module.exports = router;
