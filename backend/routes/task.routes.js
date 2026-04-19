const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const taskController = require('../controllers/task.controller');

router.use(protect);

router.route('/')
  .get(taskController.getAllTasks)
  .post(authorize('PROJECT_MANAGER', 'ADMIN'), taskController.createTask);

router.route('/:id')
  .get(taskController.getTask)
  .put(taskController.updateTask)
  .delete(authorize('PROJECT_MANAGER', 'ADMIN'), taskController.deleteTask);

module.exports = router;