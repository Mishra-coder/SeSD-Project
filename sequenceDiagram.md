# Sequence Diagram

## Flow: Creating and Assigning a Task

This shows what happens when a project manager creates a new task and assigns it to someone.

## Steps

1. **User fills form and submits**
   - Manager opens "Create Task" form
   - Fills in: title, description, project, assignee, priority, due date
   - Clicks submit
   - Frontend sends POST request to /api/tasks

2. **Controller receives request**
   - TaskController gets the request
   - Checks if user is logged in (JWT token)
   - Validates the data (all required fields present)
   - Calls TaskService

3. **Service validates business rules**
   - Checks if project exists
   - Checks if manager has permission for this project
   - Checks if assignee is part of the project
   - Checks if due date is valid (not in past)

4. **Service creates task**
   - Builds Task object from the data
   - Sets status to TODO by default
   - Sets created timestamp

5. **Repository saves to database**
   - TaskRepository calls database
   - INSERT query runs
   - Database generates task ID
   - Returns saved task

6. **Send notification**
   - NotificationService creates notification
   - Saves notification to database
   - Sends email to assignee

7. **Return response**
   - Service converts Task to DTO (hides sensitive data)
   - Controller sends 201 Created response
   - Frontend shows success message

## Error Cases

### If user not authorized:
- Service checks project access
- Throws UnauthorizedException  
- Controller returns 403 Forbidden
- Frontend shows error message

### If assignee not in project:
- Service validates team membership
- Throws ValidationException
- Controller returns 400 Bad Request
- Frontend shows error

### If due date in past:
- Service validates date
- Throws ValidationException
- Controller returns 400 Bad Request
- Frontend shows error

## Design Patterns in this flow

- **Repository Pattern**: TaskRepository, UserRepository handle database
- **Service Layer**: Business logic in TaskService
- **DTO Pattern**: TaskDTO for input, TaskResponseDTO for output
- **Factory Pattern**: Building Task object from DTO
- **Strategy Pattern**: NotificationService can use email or in-app notification
