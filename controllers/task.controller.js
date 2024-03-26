const Task = require("../models/Task");
const taskService = require("../services/task.service");

exports.createTask = async (req, res) => {
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

exports.getTaskById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const taskId = req.params.id;

    const task = await taskService.getTaskById(userId, taskId);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
};

exports.updateTaskById = async (req, res) => {
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


exports.deleteTaskById = async (req, res) => {
    try {
      const userId = req.user.userId;
      const taskId = req.params.id;

      await taskService.deleteTaskById(userId,taskId)
      res.status(200).json({message:"Task deleted successfully"});
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  };


  exports.getAllTasks = async (req, res) => {
    try {
      const userId = req.user.userId; // Extract userId from JWT payload
      //const { sortBy, sortOrder, search, page, limit } = req.query;
      const query=req?.query
    const tasks=  await taskService.getAllTasks(userId,query)
  
      res.status(200).json(tasks);
    } catch (error) {
        console.log("err",error);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  };