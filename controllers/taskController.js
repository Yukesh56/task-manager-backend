const taskModel = require("../models/taskModels"); // importing the taskModels


async function createTask(req, res) {
  try {
    const task = await taskModel.createTask(req.body);
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getTasksByProject(req, res) {
  try {
    const projectId = parseInt(req.params.projectId);
    const tasks = await taskModel.getTasksByProject(projectId);
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateTask(req, res) {
  try {
    const taskId = parseInt(req.params.taskId);
    await taskModel.updateTask(taskId, req.body);
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function softDeleteTask(req, res) {
  try {
    const taskId = parseInt(req.params.taskId);
    await taskModel.softDeleteTask(taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createTask,
  getTasksByProject,
  updateTask,
  softDeleteTask,
};
