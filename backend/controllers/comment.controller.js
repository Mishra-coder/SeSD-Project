const { Comment, User, Task } = require('../models');

exports.getAllComments = async (req, res) => {
  try {
    const { taskId } = req.query;
    const where = {};
    
    if (taskId) where.taskId = taskId;

    const comments = await Comment.findAll({
      where,
      include: [
        { model: User, as: 'author', attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: Task, as: 'task', attributes: ['id', 'title'] }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      count: comments.length,
      data: comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: Task, as: 'task', attributes: ['id', 'title'] }
      ]
    });

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    res.json({
      success: true,
      data: comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { content, taskId } = req.body;

    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const comment = await Comment.create({
      content,
      taskId,
      authorId: req.user.id
    });

    const commentWithDetails = await Comment.findByPk(comment.id, {
      include: [
        { model: User, as: 'author', attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: Task, as: 'task', attributes: ['id', 'title'] }
      ]
    });

    res.status(201).json({
      success: true,
      data: commentWithDetails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    if (comment.authorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this comment'
      });
    }

    const { content } = req.body;
    await comment.update({ content });

    res.json({
      success: true,
      data: comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    if (comment.authorId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this comment'
      });
    }

    await comment.destroy();

    res.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};