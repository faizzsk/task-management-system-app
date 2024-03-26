const Task = require("../models/Task");

exports.createTask = async (taskData) => {
  const task = new Task(taskData);

  await task.save();
};

exports.getTaskById = async (userId, taskId) => {
  const task = await Task.findOne({ _id: taskId, user: userId });
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};

exports.updateTaskById = async (userId, taskId, updateData) => {
  try {
    //   const userId = req.user.userId;
    //   const taskId = req.params.id;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { ...updateData, updatedBy: userId },
      { new: true }
    );
    if (!updatedTask) {
      throw new Error("Task not found");
    }
    return updatedTask;
  } catch (error) {
    throw new Error("Failed to update task");
    //res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.deleteTaskById = async (userId, taskId) => {
  try {
    //   const userId = req.user.userId;
    //   const taskId = req.params.id;
    const deletedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { isActive: false, deletedBy: userId }
    );
    if (!deletedTask) {
      throw new Error("Task not found");
    }
    // res.status(200).json(deletedTask);
  } catch (error) {
    // res.status(500).json({ error: 'Failed to delete task' });
    throw new Error("Failed to delete task");
  }
};

// Pagination with sorting, searching, pagination

exports.getAllTasks = async (userId, query) => {
  try {
    const { sortBy, sortOrder, search, page = 1, limit = 10 } = query;
    const pipeline = [];

    pipeline.push({ $match: { createdBy: userId } })

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { status: { $regex: search, $options: "i" } },

          ],
        },
      });
    }

    if (sortBy && sortOrder) {
      pipeline.push({
        $sort: { [sortBy]: parseInt(sortOrder) === 1 ? 1 : -1 },
      });
    }

    if (page && limit) {
      pipeline.push({ $skip: (page - 1) * limit });
      pipeline.push({ $limit: parseInt(limit) });
    }
    console.log("pipeline",pipeline);
    // Build aggregation pipeline stages based on query parameters
    //   const pipeline = [
    //     { $match: { user: userId,isActive:true } },
    //     { $sort: { [sortBy]: parseInt(sortOrder) === 1 ? 1 : -1 } }, // Ensure sort order is properly handled
    //     { $skip: (page - 1) * limit },
    //     { $limit: parseInt(limit) }
    //   ];

    //   if (search) {
    //     pipeline.unshift({
    //       $match: {
    //         $or: [
    //           { title: { $regex: search, $options: 'i' } },
    //           { description: { $regex: search, $options: 'i' } }
    //         ]
    //       }
    //     });
    //   }

    const tasks = await Task.aggregate(pipeline);

  //  const total_pages = Math.ceil(tasks.length / limit);
    const total_pages = Math.ceil(tasks.length / limit);

    // Ensure current page does not exceed total pages
    const current_page = Math.min(page, total_pages);

    // Prepare response object with pagination information
    const response = {
      data: {
        tasks,
        pagination: {
          total_pages,
          current_page: current_page,//parseInt(page),
          per_page: parseInt(limit)
        }
      }
    };

    console.log("task",response);
    return response;
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to fetch tasks");
  }
};
