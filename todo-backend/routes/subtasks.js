const express = require('express');
const router = express.Router();
const subTasks = require("../controllers/subtasks");

// Create a new Subtask
router.post("/", subTasks.create);

// Retrieve all Subtask
router.get("/:id", subTasks.findAll);

// Update a Subtask with id
router.put("/:id", subTasks.update);

module.exports = router;
