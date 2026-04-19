const { User, Project, Task, ProjectMember } = require('../models');
const bcrypt = require('bcryptjs');

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');

    const adminUser = await User.create({
      email: 'admin@taskmanagement.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isActive: true
    });

    const managerUser = await User.create({
      email: 'manager@taskmanagement.com',
      password: 'manager123',
      firstName: 'Project',
      lastName: 'Manager',
      role: 'PROJECT_MANAGER',
      isActive: true
    });

    const teamMember = await User.create({
      email: 'member@taskmanagement.com',
      password: 'member123',
      firstName: 'Team',
      lastName: 'Member',
      role: 'TEAM_MEMBER',
      isActive: true
    });

    const project1 = await Project.create({
      name: 'E-commerce Platform',
      description: 'Building a modern e-commerce platform with React and Node.js',
      status: 'ACTIVE',
      ownerId: managerUser.id
    });

    const project2 = await Project.create({
      name: 'Mobile Banking App',
      description: 'Secure mobile banking application for iOS and Android',
      status: 'ACTIVE',
      ownerId: managerUser.id
    });

    await ProjectMember.bulkCreate([
      { projectId: project1.id, userId: managerUser.id },
      { projectId: project1.id, userId: teamMember.id },
      { projectId: project2.id, userId: managerUser.id },
      { projectId: project2.id, userId: teamMember.id }
    ]);

    await Task.bulkCreate([
      {
        title: 'Setup project structure',
        description: 'Initialize React project with required dependencies',
        projectId: project1.id,
        assigneeId: teamMember.id,
        status: 'DONE',
        priority: 'HIGH',
        dueDate: new Date('2024-01-20')
      },
      {
        title: 'Design database schema',
        description: 'Create ER diagram and define database tables',
        projectId: project1.id,
        assigneeId: teamMember.id,
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        dueDate: new Date('2024-01-25')
      },
      {
        title: 'Implement authentication',
        description: 'Add login and registration functionality',
        projectId: project1.id,
        assigneeId: teamMember.id,
        status: 'TODO',
        priority: 'CRITICAL',
        dueDate: new Date('2024-01-30')
      },
      {
        title: 'Create API endpoints',
        description: 'Develop RESTful API for mobile app',
        projectId: project2.id,
        assigneeId: teamMember.id,
        status: 'TODO',
        priority: 'MEDIUM',
        dueDate: new Date('2024-02-05')
      }
    ]);

    console.log('Database seeded successfully!');
    console.log('\nTest Accounts:');
    console.log('Admin: admin@taskmanagement.com / admin123');
    console.log('Manager: manager@taskmanagement.com / manager123');
    console.log('Member: member@taskmanagement.com / member123');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase;