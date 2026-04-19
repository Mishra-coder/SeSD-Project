const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'task_id'
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'author_id'
  }
}, {
  tableName: 'comments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Comment;