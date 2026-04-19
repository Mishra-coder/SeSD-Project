const { Project, User, Task, ProjectMember } = require('../models');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        { model: User, as: 'owner', attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: User, as: 'members', attributes: ['id', 'firstName', 'lastName', 'email'], through: { attributes: [] } },
        { model: Task, as: 'tasks' }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        { model: User, as: 'owner', attributes: ['id', 'firstName', 'lastName', 'email'] },
        { model: User, as: 'members', attributes: ['id', 'firstName', 'lastName', 'email'], through: { attributes: [] } },
        { 
          model: Task, 
          as: 'tasks',
          include: [{ model: User, as: 'assignee', attributes: ['id', 'firstName', 'lastName'] }]
        }
      ]
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, description, status } = req.body;

    const project = await Project.create({
      name,
      description,
      status: status || 'ACTIVE',
      ownerId: req.user.id
    });

    await ProjectMember.create({
      projectId: project.id,
      userId: req.user.id
    });

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (project.ownerId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this project'
      });
    }

    const { name, description, status } = req.body;
    await project.update({ name, description, status });

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    if (project.ownerId !== req.user.id && req.user.role !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this project'
      });
    }

    await project.destroy();

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { userId } = req.body;
    const projectId = req.params.id;

    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const existingMember = await ProjectMember.findOne({
      where: { projectId, userId }
    });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: 'User is already a member of this project'
      });
    }

    await ProjectMember.create({ projectId, userId });

    res.status(201).json({
      success: true,
      message: 'Member added successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.removeMember = async (req, res) => {
  try {
    const { id: projectId, userId } = req.params;

    const member = await ProjectMember.findOne({
      where: { projectId, userId }
    });

    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found in this project'
      });
    }

    await member.destroy();

    res.json({
      success: true,
      message: 'Member removed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};