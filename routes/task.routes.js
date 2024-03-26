const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const taskController = require('../controllers/task.controller');
 
// Protected routes that require authentication
router.get('/', authMiddleware.verifyToken, taskController.getAllTasks);
router.get('/:id', authMiddleware.verifyToken, taskController.getTaskById);
router.post('/', authMiddleware.verifyToken, taskController.createTask);
router.put('/:id', authMiddleware.verifyToken, taskController.updateTaskById);
router.delete('/:id', authMiddleware.verifyToken, taskController.deleteTaskById);

module.exports = router;
