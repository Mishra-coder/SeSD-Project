# ER Diagram (Database Design)

## Database: PostgreSQL

## Tables

### USERS
Stores user information and login credentials

| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary key, auto increment |
| email | VARCHAR(255) | Unique, for login |
| password | VARCHAR(255) | Encrypted with BCrypt |
| first_name | VARCHAR(100) | User's first name |
| last_name | VARCHAR(100) | User's last name |
| role | VARCHAR(50) | ADMIN, PROJECT_MANAGER, or TEAM_MEMBER |
| is_active | BOOLEAN | Account active or not |
| created_at | TIMESTAMP | When account was created |
| updated_at | TIMESTAMP | Last update time |

Indexes:
- Primary key on id
- Unique index on email (for fast login lookup)

---

### PROJECTS
Stores project information

| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary key |
| name | VARCHAR(255) | Project name |
| description | TEXT | Project details |
| owner_id | BIGINT | Foreign key to USERS (who created it) |
| status | VARCHAR(50) | ACTIVE, COMPLETED, or ARCHIVED |
| created_at | TIMESTAMP | When created |
| updated_at | TIMESTAMP | Last update |

Indexes:
- Primary key on id
- Foreign key on owner_id → USERS(id)
- Index on owner_id (to find user's projects quickly)

---

### PROJECT_MEMBERS
Links users to projects (many-to-many relationship)

| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary key |
| project_id | BIGINT | Foreign key to PROJECTS |
| user_id | BIGINT | Foreign key to USERS |
| joined_at | TIMESTAMP | When user joined project |

Indexes:
- Primary key on id
- Unique index on (project_id, user_id) - prevents duplicate membership
- Foreign keys on both project_id and user_id

---

### TASKS
Stores task information

| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary key |
| title | VARCHAR(255) | Task title |
| description | TEXT | Task details |
| project_id | BIGINT | Foreign key to PROJECTS |
| assignee_id | BIGINT | Foreign key to USERS (who's doing it) |
| status | VARCHAR(50) | TODO, IN_PROGRESS, REVIEW, or DONE |
| priority | VARCHAR(50) | LOW, MEDIUM, HIGH, or CRITICAL |
| due_date | DATE | Deadline |
| created_at | TIMESTAMP | When created |
| updated_at | TIMESTAMP | Last update |

Indexes:
- Primary key on id
- Foreign key on project_id → PROJECTS(id)
- Foreign key on assignee_id → USERS(id)
- Index on project_id (to get all tasks in a project)
- Index on assignee_id (to get user's tasks)
- Index on due_date (to find overdue tasks)

---

### COMMENTS
Stores comments on tasks

| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary key |
| content | TEXT | Comment text |
| task_id | BIGINT | Foreign key to TASKS |
| author_id | BIGINT | Foreign key to USERS (who wrote it) |
| created_at | TIMESTAMP | When posted |
| updated_at | TIMESTAMP | Last edit time |

Indexes:
- Primary key on id
- Foreign key on task_id → TASKS(id)
- Foreign key on author_id → USERS(id)
- Index on task_id (to get all comments for a task)

---

### NOTIFICATIONS
Stores user notifications

| Column | Type | Description |
|--------|------|-------------|
| id | BIGINT | Primary key |
| message | VARCHAR(500) | Notification text |
| type | VARCHAR(50) | TASK_ASSIGNED, TASK_UPDATED, COMMENT_ADDED, etc |
| user_id | BIGINT | Foreign key to USERS (who receives it) |
| is_read | BOOLEAN | Read or unread |
| related_entity_id | VARCHAR(100) | ID of related task/project |
| created_at | TIMESTAMP | When created |

Indexes:
- Primary key on id
- Foreign key on user_id → USERS(id)
- Index on (user_id, is_read) - to quickly find unread notifications

---

## Relationships

### One-to-Many

1. **USERS → PROJECTS** (owner)
   - One user can own many projects
   - Foreign key: projects.owner_id → users.id
   - If user deleted, their projects are also deleted (CASCADE)

2. **USERS → TASKS** (assignee)
   - One user can be assigned many tasks
   - Foreign key: tasks.assignee_id → users.id
   - If user deleted, tasks become unassigned (SET NULL)

3. **PROJECTS → TASKS**
   - One project has many tasks
   - Foreign key: tasks.project_id → projects.id
   - If project deleted, all its tasks are deleted (CASCADE)

4. **TASKS → COMMENTS**
   - One task has many comments
   - Foreign key: comments.task_id → tasks.id
   - If task deleted, comments are deleted (CASCADE)

5. **USERS → COMMENTS** (author)
   - One user writes many comments
   - Foreign key: comments.author_id → users.id
   - If user deleted, their comments are deleted (CASCADE)

6. **USERS → NOTIFICATIONS**
   - One user receives many notifications
   - Foreign key: notifications.user_id → users.id
   - If user deleted, notifications are deleted (CASCADE)

### Many-to-Many

**USERS ↔ PROJECTS** (team membership)
- Many users can be in many projects
- Junction table: PROJECT_MEMBERS
- Links user_id and project_id

## Sample Queries

Get all tasks for a project:
```sql
SELECT * FROM tasks 
WHERE project_id = 1 
ORDER BY priority DESC, due_date ASC;
```

Get user's unread notifications:
```sql
SELECT * FROM notifications 
WHERE user_id = 5 AND is_read = false 
ORDER BY created_at DESC;
```

Get overdue tasks:
```sql
SELECT t.*, u.email 
FROM tasks t 
LEFT JOIN users u ON t.assignee_id = u.id 
WHERE t.due_date < CURRENT_DATE AND t.status != 'DONE';
```

Get project completion percentage:
```sql
SELECT 
  COUNT(*) as total_tasks,
  SUM(CASE WHEN status = 'DONE' THEN 1 ELSE 0 END) as completed,
  ROUND(100.0 * SUM(CASE WHEN status = 'DONE' THEN 1 ELSE 0 END) / COUNT(*), 2) as percentage
FROM tasks 
WHERE project_id = 1;
```

## Notes

- All IDs are BIGINT for scalability
- Timestamps track when records are created/updated
- Foreign keys maintain data integrity
- Indexes improve query performance
- CASCADE deletes keep database clean
- Email must be unique for login
- Passwords are encrypted, never stored plain text

We chose PostgreSQL because it's reliable and handles relationships well. The schema is normalized to avoid data duplication.
