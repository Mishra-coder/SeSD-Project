const { Task, User, Project, Comment } = require('../models');

exports.getAllTasks = async (req, res) => {
  try {
    const { projectId, status, priority, assigneeId } = req.query;
    const where = {};

    if (projectId) where.projectId = projectId;
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (assigneeId) where.assigneeId = assigneeId;

    const tasks = await Task.findAll({
      where,
      include: [
        { model: User, as: 'assignee', attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: Project, as: 'project', attributes: ['id', 'name'] },
        { 
          model: Comment, 
          as: 'comments',
          include: [{ model: User, as: 'author', attributes: ['id', 'firstName', 'lastName'] }]
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [
        { model: User, as: 'assignee', attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: Project, as: 'project', attributes: ['id', 'name'] },
        { 
          model: Comment, 
          as: 'comments',
          include: [{ model: User, as: 'author', attributes: ['id', 'firstName', 'lastName'] }]
        }
      ]
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, projectId, assigneeId, priority, status, dueDate } = req.body;

    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (assigneeId) {
      const assignee = await User.findByPk(assigneeId);
      if (!assignee) {
        return res.status(404).json({
          success: false,
          message: 'Assignee not found'
        });
      }
    }

    const task = await Task.create({
      title,
      description,
      projectId,
      assigneeId,
      priority: priority || 'MEDIUM',
      status: status || 'TODO',
      dueDate
    });

    const taskWithDetails = await Task.findByPk(task.id, {
      include: [
        { model: User, as: 'assignee', attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: Project, as: 'project', attributes: ['id', 'name'] }
      ]
    });

    res.status(201).json({
      success: true,
      data: taskWithDetails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    const { title, description, status, priority, assigneeId, dueDate } = req.body;
    await task.update({ title, description, status, priority, assigneeId, dueDate });

    const updatedTask = await Task.findByPk(task.id, {
      include: [
        { model: User, as: 'assignee', attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: Project, as: 'project', attributes: ['id', 'name'] }
      ]
    });

    res.json({
      success: true,
      data: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    await task.destroy();

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};