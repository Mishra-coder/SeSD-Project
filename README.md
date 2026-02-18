# TaskFlow - Collaborative Task Management System

## SESD Project Milestone-1 Submission

A full-stack task management application built with Spring Boot and React, emphasizing software engineering principles, OOP concepts, and design patterns.

## Project Documentation

This repository contains the complete project documentation for Milestone-1:

- **[useCaseDiagram.md](./useCaseDiagram.md)** - Use case diagram with actors and interactions
- **[sequenceDiagram.md](./sequenceDiagram.md)** - Sequence diagram showing end-to-end flow
- **[classDiagram.md](./classDiagram.md)** - Class diagram with OOP principles and design patterns
- **[ErDiagram.md](./ErDiagram.md)** - Entity-relationship diagram with database schema

## Project Overview

TaskFlow is a collaborative task management system that enables teams to:
- Create and manage projects
- Assign and track tasks
- Collaborate through comments
- Receive real-time notifications
- View analytics and progress metrics

## Architecture

### Backend (75% Focus)
- **Language**: Java 17
- **Framework**: Spring Boot 3.x
- **Database**: PostgreSQL 15
- **ORM**: Hibernate (JPA)
- **Security**: Spring Security + JWT
- **Architecture**: Layered (Controller → Service → Repository → Entity)

### Frontend (25% Focus)
- **Framework**: React 18
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI (MUI)

## Software Engineering Practices

### OOP Principles
- **Encapsulation**: Private fields with controlled access
- **Abstraction**: Interface-based repository and service layers
- **Inheritance**: Base entity classes for common fields
- **Polymorphism**: Strategy pattern for notifications

### Design Patterns
- **Repository Pattern**: Data access abstraction
- **Service Layer Pattern**: Business logic separation
- **DTO Pattern**: API contract decoupling
- **Factory Pattern**: Entity creation
- **Strategy Pattern**: Notification delivery
- **Observer Pattern**: Event-driven notifications
- **Dependency Injection**: Throughout all layers

## Key Features

1. **User Management**
   - JWT-based authentication
   - Role-based access control (Admin, Project Manager, Team Member)
   - Profile management

2. **Project Management**
   - Create and manage projects
   - Team member assignment
   - Progress tracking

3. **Task Management**
   - CRUD operations
   - Priority levels (LOW, MEDIUM, HIGH, CRITICAL)
   - Status tracking (TODO, IN_PROGRESS, REVIEW, DONE)
   - Due date management

4. **Collaboration**
   - Task comments
   - Activity history
   - Email notifications

5. **Analytics**
   - Task completion statistics
   - Team productivity metrics
   - Project progress visualization

## Database Schema

The application uses PostgreSQL with a normalized schema (3NF) including:
- **USERS**: User accounts and authentication
- **PROJECTS**: Project information
- **PROJECT_MEMBERS**: Team membership (junction table)
- **TASKS**: Task details and assignments
- **COMMENTS**: Task discussions
- **NOTIFICATIONS**: User notifications

## Getting Started

### Prerequisites
- Java 17+
- Maven 3.8+
- PostgreSQL 15+
- Node.js 18+
- npm or yarn

### Backend Setup
```bash
# Clone the repository
git clone <repository-url>
cd taskflow

# Configure database in application.properties
# spring.datasource.url=jdbc:postgresql://localhost:5432/taskflow
# spring.datasource.username=your_username
# spring.datasource.password=your_password

# Build and run
mvn clean install
mvn spring-boot:run
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project
- `GET /api/projects/{id}` - Get project details
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Tasks
- `GET /api/tasks` - List all tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/{id}` - Get task details
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

### Comments
- `GET /api/tasks/{taskId}/comments` - Get task comments
- `POST /api/tasks/{taskId}/comments` - Add comment
- `PUT /api/comments/{id}` - Update comment
- `DELETE /api/comments/{id}` - Delete comment

## Team

[Add your team member names and roles here]

## Project Timeline

- **Milestone 1**: Idea and diagrams submission (Completed)
- **Milestone 2**: Implementation (Coming soon)
- **Milestone 3**: Testing and deployment (Coming soon)

## License

This project is created for educational purposes as part of the SESD course.

---

**Note**: This is Milestone-1 submission focusing on project planning and design. Implementation will follow in subsequent milestones.
