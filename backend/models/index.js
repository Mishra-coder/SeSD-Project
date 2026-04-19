const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');
const Comment = require('./Comment');
const Notification = require('./Notification');
const ProjectMember = require('./ProjectMember');

User.hasMany(Project, { foreignKey: 'ownerId', as: 'ownedProjects' });
Project.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

User.belongsToMany(Project, { 
  through: ProjectMember, 
  foreignKey: 'userId',
  otherKey: 'projectId',
  as: 'projects'
});
Project.belongsToMany(User, { 
  through: ProjectMember, 
  foreignKey: 'projectId',
  otherKey: 'userId',
  as: 'members'
});

Project.hasMany(Task, { foreignKey: 'projectId', as: 'tasks' });
Task.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

User.hasMany(Task, { foreignKey: 'assigneeId', as: 'assignedTasks' });
Task.belongsTo(User, { foreignKey: 'assigneeId', as: 'assignee' });

Task.hasMany(Comment, { foreignKey: 'taskId', as: 'comments' });
Comment.belongsTo(Task, { foreignKey: 'taskId', as: 'task' });

User.hasMany(Comment, { foreignKey: 'authorId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  User,
  Project,
  Task,
  Comment,
  Notification,
  ProjectMember
};