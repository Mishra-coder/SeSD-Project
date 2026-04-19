const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ProjectMember = sequelize.define('ProjectMember', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'project_id'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id'
  },
  joinedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'joined_at'
  }
}, {
  tableName: 'project_members',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['project_id', 'user_id']
    }
  ]
});

module.exports = ProjectMember;