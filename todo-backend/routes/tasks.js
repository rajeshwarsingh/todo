const express = require('express');
const router = express.Router();
const tasks = require("../controllers/tasks");

// Create a new Task
router.post("/", tasks.create);

// Retrieve all Tasks
router.get("/", tasks.findAll);

// Update a Task with id
router.put("/:id", tasks.update);

module.exports = router;
