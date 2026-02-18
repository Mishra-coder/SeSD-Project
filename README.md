# Task Management System

## SESD Project - Milestone 1

A task management web application for teams to manage projects and tasks efficiently.

## Project Idea

We're building a task management system where teams can create projects, assign tasks to members, track progress, and collaborate. Think of it like a simplified version of Jira or Trello but focused on core features.

Main features we plan to implement:
- User login/signup with different roles (admin, manager, team member)
- Create projects and add team members
- Create tasks, assign them, set priorities and deadlines
- Comment on tasks for discussion
- Dashboard to see task statistics
- Email notifications when tasks are assigned

## Documentation Files

- [useCaseDiagram.md](./useCaseDiagram.md) - Shows different user types and what they can do
- [sequenceDiagram.md](./sequenceDiagram.md) - How task creation works step by step
- [classDiagram.md](./classDiagram.md) - Backend structure with classes and relationships
- [ErDiagram.md](./ErDiagram.md) - Database tables and how they connect

## Tech Stack

### Backend (main focus - 75%)
- Java with Spring Boot
- PostgreSQL database
- JWT for authentication
- Hibernate for database operations

### Frontend (25%)
- React for UI
- Material-UI for components
- Axios for API calls

## OOP & Design Patterns

We're using proper OOP concepts:
- Encapsulation - keeping data private with getters/setters
- Abstraction - using interfaces for repositories
- Inheritance - base entity class for common fields like id, timestamps
- Polymorphism - different notification types (email, in-app)

Design patterns we'll use:
- Repository pattern for database access
- Service layer for business logic  
- DTO pattern to separate API from database models
- Factory pattern for creating objects
- Strategy pattern for notifications

We'll make sure to follow these properly in implementation phase.

## Main Features

1. User Management
   - Register and login
   - Three roles: Admin, Project Manager, Team Member
   - Profile page

2. Projects
   - Create projects
   - Add team members
   - Track overall progress

3. Tasks
   - Create, edit, delete tasks
   - Set priority (Low, Medium, High, Critical)
   - Status: TODO, In Progress, Review, Done
   - Set due dates

4. Collaboration
   - Add comments on tasks
   - Get email notifications
   - See who's working on what

5. Dashboard
   - See your assigned tasks
   - View project statistics
   - Check overdue tasks

## Database

Using PostgreSQL with these main tables:
- USERS - stores user info and login credentials
- PROJECTS - project details
- PROJECT_MEMBERS - which users are in which projects
- TASKS - task information
- COMMENTS - comments on tasks
- NOTIFICATIONS - user notifications

## Setup (will implement later)

Need to install:
- Java 17
- Maven
- PostgreSQL
- Node.js

Will add detailed setup instructions once we start coding.

## API Endpoints (planned)

Authentication:
- POST /api/auth/register
- POST /api/auth/login

Projects:
- GET /api/projects
- POST /api/projects
- GET /api/projects/{id}
- PUT /api/projects/{id}
- DELETE /api/projects/{id}

Tasks:
- GET /api/tasks
- POST /api/tasks
- GET /api/tasks/{id}
- PUT /api/tasks/{id}
- DELETE /api/tasks/{id}

Comments:
- GET /api/tasks/{taskId}/comments
- POST /api/tasks/{taskId}/comments

## Team Members

[Add your names here]

## Timeline

- Milestone 1: Project idea and diagrams (Done)
- Milestone 2: Start backend implementation
- Milestone 3: Complete and test everything

## Notes

This is for our SESD course project. We've completed the planning and diagrams for milestone 1. Implementation will start in milestone 2.

Backend will be the main focus (75% marks) so we're putting more effort there. We'll make sure to use proper OOP principles and design patterns as required.
