const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const userController = require('../controllers/user.controller');

router.use(protect);

router.get('/me', userController.getMe);
router.put('/me', userController.updateMe);
router.put('/me/password', userController.updatePassword);

router.get('/', authorize('ADMIN'), userController.getAllUsers);
router.get('/:id', userController.getUser);
router.put('/:id', authorize('ADMIN'), userController.updateUser);
router.delete('/:id', authorize('ADMIN'), userController.deleteUser);

module.exports = router;