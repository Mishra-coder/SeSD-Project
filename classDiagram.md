# Class Diagram

## Backend Structure

We're using layered architecture: Controller → Service → Repository → Database

## Main Components

### Controllers (Handle HTTP requests)

**TaskController**
- createTask()
- updateTask()
- deleteTask()
- getTaskById()
- getTasksByProject()
- assignTask()

**ProjectController**
- createProject()
- updateProject()
- deleteProject()
- getProjectById()
- addTeamMember()
- removeTeamMember()

**UserController**
- register()
- login()
- getProfile()
- updateProfile()

**CommentController**
- addComment()
- updateComment()
- deleteComment()
- getCommentsByTask()

### Services (Business Logic)

**TaskService**
- createTask() - validates and creates task
- updateTask() - updates task details
- deleteTask() - removes task
- assignTask() - assigns task to user
- validateProjectAccess() - checks permissions
- validateUserInProject() - checks membership

**ProjectService**
- createProject()
- updateProject()
- addTeamMember()
- removeTeamMember()
- validateProjectOwnership()

**UserService**
- registerUser() - creates new user
- getUserById()
- updateUser()
- validateUserData()

**AuthenticationService**
- authenticate() - login logic
- generateToken() - creates JWT
- validateToken()

**NotificationService**
- notifyTaskAssignment()
- notifyTaskStatusChange()
- notifyComment()
- sendEmail()

### Repositories (Database Access)

All repositories are interfaces that extend JpaRepository:

**TaskRepository**
- save()
- findById()
- findByProjectId()
- findByAssigneeId()
- deleteById()

**ProjectRepository**
- save()
- findById()
- findByOwnerId()
- deleteById()

**UserRepository**
- save()
- findById()
- findByEmail()
- existsByEmail()

**CommentRepository**
- save()
- findById()
- findByTaskId()

**NotificationRepository**
- save()
- findByUserId()
- findByUserIdAndIsRead()

### Entities (Database Tables)

**BaseEntity** (parent class for all entities)
- id
- createdAt
- updatedAt

**User** extends BaseEntity
- email
- password (encrypted)
- firstName
- lastName
- role (ADMIN, PROJECT_MANAGER, TEAM_MEMBER)
- isActive

**Project** extends BaseEntity
- name
- description
- owner (User)
- teamMembers (List of Users)
- status (ACTIVE, COMPLETED, ARCHIVED)

**Task** extends BaseEntity
- title
- description
- project (Project)
- assignee (User)
- status (TODO, IN_PROGRESS, REVIEW, DONE)
- priority (LOW, MEDIUM, HIGH, CRITICAL)
- dueDate

**Comment** extends BaseEntity
- content
- task (Task)
- author (User)

**Notification** extends BaseEntity
- message
- type (TASK_ASSIGNED, TASK_UPDATED, COMMENT_ADDED)
- user (User)
- isRead

### DTOs (Data Transfer Objects)

Used to send/receive data from API without exposing full entity:

**TaskDTO** (for creating task)
- title
- description
- projectId
- assigneeId
- priority
- dueDate

**TaskResponseDTO** (for returning task)
- id
- title
- description
- assignee (UserResponseDTO)
- status
- priority
- dueDate

**UserResponseDTO**
- id
- email
- firstName
- lastName
- role

**LoginDTO**
- email
- password

**RegisterDTO**
- email
- password
- firstName
- lastName

## Relationships

- User owns multiple Projects (one-to-many)
- User can be member of multiple Projects (many-to-many)
- Project has multiple Tasks (one-to-many)
- User can be assigned multiple Tasks (one-to-many)
- Task has multiple Comments (one-to-many)
- User writes multiple Comments (one-to-many)
- User receives multiple Notifications (one-to-many)

Note: The many-to-many relationship between Users and Projects is handled through the PROJECT_MEMBERS junction table.

## OOP Concepts Used

**Encapsulation**
- All entity fields are private
- Access through getters/setters only
- Business logic hidden in service layer

**Abstraction**
- Repository interfaces hide database details
- Service interfaces define contracts
- DTOs abstract internal structure

**Inheritance**
- All entities extend BaseEntity
- Reuses common fields (id, timestamps)
- Reduces code duplication

**Polymorphism**
- Different notification types (email, in-app)
- Repository methods work with interfaces
- Can swap implementations easily

## Design Patterns

**Repository Pattern**
- Separates database logic from business logic
- Makes testing easier (can mock repositories)
- Used in all Repository classes

**Service Layer Pattern**
- Business logic separate from controllers
- Controllers just handle HTTP, services do the work
- Used in all Service classes

**DTO Pattern**
- API uses DTOs, not entities directly
- Hides sensitive data (like passwords)
- Can change entity without breaking API

**Factory Pattern**
- Creating Task objects from DTOs
- Ensures objects are created correctly

**Strategy Pattern**
- NotificationService can use email or in-app
- Can add more notification types later

**Dependency Injection**
- Spring automatically injects dependencies
- Loose coupling between classes
- Easy to test with mocks

## Architecture Layers

```
Frontend (React)
    ↓
Controllers (HTTP handling)
    ↓
Services (Business logic)
    ↓
Repositories (Database access)
    ↓
Database (PostgreSQL)
```

Each layer only talks to the layer below it. This makes code organized and easier to maintain.

Controllers don't directly access database - they go through services. Services use repositories for database operations. This separation helps in testing and maintaining code.
