const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const taskController = require("../controllers/task.controller");

// Protected routes
// Get All Task
router.get("/", authMiddleware.verifyToken, taskController.getAllTasks);

// Get Task By Id
router.get("/:id", authMiddleware.verifyToken, taskController.getTaskById);

// Create Task
router.post("/", authMiddleware.verifyToken, taskController.createTask);

// Update task by Id
router.put("/:id", authMiddleware.verifyToken, taskController.updateTaskById);

// Delete Task
router.delete(
  "/:id",
  authMiddleware.verifyToken,
  taskController.deleteTaskById
);

module.exports = router;
