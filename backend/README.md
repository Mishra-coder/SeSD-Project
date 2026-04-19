# Task Management System - Backend API

Express.js REST API for Task Management System with PostgreSQL database.

## Technology Stack

- Node.js - Runtime environment
- Express.js - Web framework
- PostgreSQL - Relational database
- Sequelize - ORM for database operations
- JWT - Authentication and authorization
- Bcrypt - Password hashing

## Prerequisites

- Node.js v16 or higher
- PostgreSQL v12 or higher
- npm or yarn

## Installation

1. Navigate to backend directory
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Create PostgreSQL database
```bash
createdb taskmanagement
```

4. Configure environment variables
```bash
cp .env.example .env
```

Edit `.env` file with your database credentials:
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskmanagement
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
JWT_EXPIRE=24h
```

5. Start the server
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication

POST /api/auth/register - Register new user
POST /api/auth/login - Login user

### Users

GET /api/users/me - Get current user profile
PUT /api/users/me - Update current user profile
PUT /api/users/me/password - Change password
GET /api/users - Get all users (Admin only)
GET /api/users/:id - Get user by ID
PUT /api/users/:id - Update user (Admin only)
DELETE /api/users/:id - Delete user (Admin only)

### Projects

GET /api/projects - Get all projects
POST /api/projects - Create project (PM/Admin)
GET /api/projects/:id - Get project by ID
PUT /api/projects/:id - Update project (PM/Admin)
DELETE /api/projects/:id - Delete project (PM/Admin)
POST /api/projects/:id/members - Add team member (PM/Admin)
DELETE /api/projects/:id/members/:userId - Remove member (PM/Admin)

### Tasks

GET /api/tasks - Get all tasks (with filters)
POST /api/tasks - Create task (PM/Admin)
GET /api/tasks/:id - Get task by ID
PUT /api/tasks/:id - Update task
DELETE /api/tasks/:id - Delete task (PM/Admin)

Query parameters for filtering:
- projectId - Filter by project
- status - Filter by status (TODO, IN_PROGRESS, REVIEW, DONE)
- priority - Filter by priority (LOW, MEDIUM, HIGH, CRITICAL)
- assigneeId - Filter by assignee

### Comments

GET /api/comments - Get all comments
POST /api/comments - Create comment
GET /api/comments/:id - Get comment by ID
PUT /api/comments/:id - Update comment
DELETE /api/comments/:id - Delete comment

### Notifications

GET /api/notifications - Get user notifications
PUT /api/notifications/:id/read - Mark notification as read
PUT /api/notifications/read-all - Mark all as read
DELETE /api/notifications/:id - Delete notification

## Authentication

All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## User Roles

- ADMIN - Full system access
- PROJECT_MANAGER - Can create/manage projects and tasks
- TEAM_MEMBER - Can view and update assigned tasks

## Database Schema

### Users Table
- id (Primary Key)
- email (Unique)
- password (Hashed)
- firstName
- lastName
- role (ENUM)
- isActive (Boolean)
- created_at
- updated_at

### Projects Table
- id (Primary Key)
- name
- description
- status (ENUM: ACTIVE, COMPLETED, ARCHIVED)
- ownerId (Foreign Key to Users)
- created_at
- updated_at

### Tasks Table
- id (Primary Key)
- title
- description
- status (ENUM: TODO, IN_PROGRESS, REVIEW, DONE)
- priority (ENUM: LOW, MEDIUM, HIGH, CRITICAL)
- dueDate
- projectId (Foreign Key to Projects)
- assigneeId (Foreign Key to Users)
- created_at
- updated_at

### Comments Table
- id (Primary Key)
- content
- taskId (Foreign Key to Tasks)
- authorId (Foreign Key to Users)
- created_at
- updated_at

### Notifications Table
- id (Primary Key)
- message
- type (ENUM)
- isRead (Boolean)
- userId (Foreign Key to Users)
- relatedEntityId
- created_at

### ProjectMembers Table
- id (Primary Key)
- projectId (Foreign Key to Projects)
- userId (Foreign Key to Users)
- joinedAt

## Error Handling

API returns consistent error responses:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Success Response Format

```json
{
  "success": true,
  "data": {},
  "count": 0
}
```

## Development

Run with nodemon for auto-reload:
```bash
npm run dev
```

## Testing

Test API endpoints using:
- Postman
- Thunder Client (VS Code extension)
- curl commands

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation
- SQL injection prevention (Sequelize ORM)
- CORS enabled

## Deployment

For production deployment:

1. Set NODE_ENV to production
2. Use strong JWT_SECRET
3. Configure production database
4. Enable HTTPS
5. Set up proper logging
6. Configure rate limiting

## License

Educational project for SESD course.