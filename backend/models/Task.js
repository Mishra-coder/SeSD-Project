const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'),
    defaultValue: 'TODO'
  },
  priority: {
    type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL'),
    defaultValue: 'MEDIUM'
  },
  dueDate: {
    type: DataTypes.DATE,
    field: 'due_date'
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'project_id'
  },
  assigneeId: {
    type: DataTypes.INTEGER,
    field: 'assignee_id'
  }
}, {
  tableName: 'tasks',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Task;