const { validationResult } = require("express-validator");
const Task = require("../models/Task");
const taskService = require("../services/task.service");
const { validateTaskCreation } = require("../validation/task.validation");

// Create Task
exports.createTask = async (req, res) => {
  console.log("--TaskController--createTask--");

  await Promise.all(
    validateTaskCreation.map((validation) => validation.run(req))
  );

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userId = req?.user?.userId;
    const taskData = { ...req.body, user: userId, createdBy: userId };

    await taskService.createTask(taskData);

    res.status(201).json({ message: "Task created succesfully" });

    // res.status(201).json(task);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};


// Get Task By Id
exports.getTaskById = async (req, res) => {
  console.log("--TaskController--getTaskById--");

  try {
    const userId = req?.user?.userId;
    const taskId = req?.params?.id;

    const task = await taskService.getTaskById(userId, taskId);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
};

exports.updateTaskById = async (req, res) => {
  console.log("--TaskController--updateTaskById--");

  try {
    const userId = req.user.userId;
    const taskId = req.params.id;
    const updateBody = req.body;

    const updatedTask = await taskService.updateTaskById(
      userId,
      taskId,
      updateBody
    );

    res.status(200).json({ message: "Task updated succesfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

// Delete By ID
exports.deleteTaskById = async (req, res) => {
  console.log("--TaskController--deleteTaskById--");

  try {
    const userId = req.user.userId;
    const taskId = req.params.id;

    await taskService.deleteTaskById(userId, taskId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};

// Get All Task
exports.getAllTasks = async (req, res) => {
  console.log("--TaskController--getAllTasks--");

  try {
    const userId = req.user.userId; // Extract userId from JWT payload
    //const { sortBy, sortOrder, search, page, limit } = req.query;
    const query = req?.query;
    const tasks = await taskService.getAllTasks(userId, query);

    res.status(200).json(tasks);
  } catch (error) {
    console.log("err", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};
