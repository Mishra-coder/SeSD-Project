const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const commentController = require('../controllers/comment.controller');

router.use(protect);

router.route('/')
  .get(commentController.getAllComments)
  .post(commentController.createComment);

router.route('/:id')
  .get(commentController.getComment)
  .put(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;