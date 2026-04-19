# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {},
  "count": 0
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

## Endpoints

### Authentication

#### Register User
```
POST /auth/register
```

Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "TEAM_MEMBER"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "TEAM_MEMBER"
    },
    "token": "jwt_token_here"
  }
}
```

#### Login
```
POST /auth/login
```

Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Users

#### Get Current User
```
GET /users/me
```

#### Update Profile
```
PUT /users/me
```

Request Body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "newemail@example.com"
}
```

#### Change Password
```
PUT /users/me/password
```

Request Body:
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword"
}
```

#### Get All Users (Admin Only)
```
GET /users
```

### Projects

#### Get All Projects
```
GET /projects
```

#### Create Project
```
POST /projects
```

Request Body:
```json
{
  "name": "Project Name",
  "description": "Project description",
  "status": "ACTIVE"
}
```

#### Get Project by ID
```
GET /projects/:id
```

#### Update Project
```
PUT /projects/:id
```

#### Delete Project
```
DELETE /projects/:id
```

#### Add Team Member
```
POST /projects/:id/members
```

Request Body:
```json
{
  "userId": 2
}
```

#### Remove Team Member
```
DELETE /projects/:id/members/:userId
```

### Tasks

#### Get All Tasks
```
GET /tasks
```

Query Parameters:
- projectId: Filter by project
- status: Filter by status (TODO, IN_PROGRESS, REVIEW, DONE)
- priority: Filter by priority (LOW, MEDIUM, HIGH, CRITICAL)
- assigneeId: Filter by assignee

Example:
```
GET /tasks?projectId=1&status=TODO
```

#### Create Task
```
POST /tasks
```

Request Body:
```json
{
  "title": "Task title",
  "description": "Task description",
  "projectId": 1,
  "assigneeId": 2,
  "priority": "HIGH",
  "status": "TODO",
  "dueDate": "2024-01-30"
}
```

#### Get Task by ID
```
GET /tasks/:id
```

#### Update Task
```
PUT /tasks/:id
```

#### Delete Task
```
DELETE /tasks/:id
```

### Comments

#### Get Comments
```
GET /comments?taskId=1
```

#### Create Comment
```
POST /comments
```

Request Body:
```json
{
  "content": "Comment text",
  "taskId": 1
}
```

#### Update Comment
```
PUT /comments/:id
```

#### Delete Comment
```
DELETE /comments/:id
```

### Notifications

#### Get My Notifications
```
GET /notifications
```

Query Parameters:
- isRead: Filter by read status (true/false)

#### Mark as Read
```
PUT /notifications/:id/read
```

#### Mark All as Read
```
PUT /notifications/read-all
```

#### Delete Notification
```
DELETE /notifications/:id
```

## Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting

Currently no rate limiting implemented. Will be added in future updates.

## Pagination

Currently returns all results. Pagination will be added in future updates.

## Testing

Use Postman, Thunder Client, or curl to test endpoints.

Example curl request:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```