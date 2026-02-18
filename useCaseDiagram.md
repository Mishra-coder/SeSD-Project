# Use Case Diagram

## Actors (Users)
- Guest - someone not logged in
- Team Member - regular user who works on tasks
- Project Manager - can create projects and manage team
- Admin - full access to everything

## What Each User Can Do

### Guest
- Register for new account
- Login to existing account

### Team Member
- View tasks assigned to them
- Update task status (move from TODO to In Progress to Done)
- Add comments on tasks
- View their dashboard
- Update their profile

### Project Manager
Everything a team member can do, plus:
- Create new projects
- Add/remove team members from projects
- Create tasks in their projects
- Assign tasks to team members
- View project analytics
- Delete tasks if needed

### Admin
Everything above, plus:
- Manage all users (activate/deactivate accounts)
- Change user roles
- View system logs

## Diagram

```
Guest can:
- Register
- Login

Team Member can:
- View assigned tasks
- Update task status
- Add comments
- View dashboard
- Update profile

Project Manager can do everything Team Member can, plus:
- Create projects
- Add team members to projects
- Create tasks
- Assign tasks
- View project stats
- Delete tasks

Admin can do everything, plus:
- Manage users
- Change user roles
- View system logs
```

## Relationships

- Project Manager inherits all Team Member capabilities
- Admin has access to all features
- Login is required for all actions except Register and Login itself
- When a task is assigned or updated, notification is sent
