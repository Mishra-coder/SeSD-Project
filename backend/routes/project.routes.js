const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const projectController = require('../controllers/project.controller');

router.use(protect);

router.route('/')
  .get(projectController.getAllProjects)
  .post(authorize('PROJECT_MANAGER', 'ADMIN'), projectController.createProject);

router.route('/:id')
  .get(projectController.getProject)
  .put(authorize('PROJECT_MANAGER', 'ADMIN'), projectController.updateProject)
  .delete(authorize('PROJECT_MANAGER', 'ADMIN'), projectController.deleteProject);

router.post('/:id/members', authorize('PROJECT_MANAGER', 'ADMIN'), projectController.addMember);
router.delete('/:id/members/:userId', authorize('PROJECT_MANAGER', 'ADMIN'), projectController.removeMember);

module.exports = router;