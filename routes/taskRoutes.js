// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware) //

// Route to create the task
router.post("/create", taskController.createTask);

// Route to get the tasks of a project
router.get("/:projectId", taskController.getTasksByProject);

//Route to update a task
router.put("/:taskId", taskController.updateTask);

//Route to delete a task
router.delete("/:taskId", taskController.softDeleteTask);

module.exports = router;
