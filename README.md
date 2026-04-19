# Task Management System

A comprehensive full-stack task management web application built with React and Express.js for teams to efficiently manage projects, tasks, and collaboration.

## Project Overview

This system enables teams to organize their work through projects and tasks, with role-based access control, real-time collaboration features, and an intuitive user interface. The application follows modern software engineering principles with a clear separation between frontend and backend layers.

## Architecture

### Frontend
Modern React application with Material-UI components providing an interactive and responsive user experience.

### Backend
RESTful API built with Express.js and PostgreSQL database, implementing secure authentication and comprehensive data management.

### Key Design Patterns
- Repository Pattern for data access layer
- Service Layer for business logic separation
- DTO Pattern for API data transfer
- Factory Pattern for object creation
- Strategy Pattern for flexible implementations

## Features

### User Management
- Secure registration and authentication system
- Role-based access control (Admin, Project Manager, Team Member)
- User profile management with password change capability
- Session persistence with JWT tokens

### Project Management
- Create and organize multiple projects
- Project status tracking (Active, Completed, Archived)
- Team member assignment and management
- Visual progress tracking with completion percentages
- Project ownership and access control

### Task Management
- Comprehensive task creation and assignment
- Priority levels (Low, Medium, High, Critical)
- Status workflow (TODO, In Progress, Review, Done)
- Due date management with calendar integration
- Task filtering and search capabilities
- Comment system for task discussions

### Dashboard and Analytics
- Overview statistics for projects and tasks
- Recent activity tracking
- Progress visualization with charts
- Overdue task monitoring
- Trend indicators and growth metrics

### User Interface
- Modern gradient-based design theme
- Responsive layout for all device sizes
- Smooth animations and transitions
- Glassmorphism effects for modern aesthetics
- Professional typography with Inter font family
- Intuitive navigation and user flows

## Technology Stack

### Frontend Technologies
- React 18 with Hooks for component logic
- Material-UI 5 for UI components and theming
- React Router 6 for client-side routing
- Context API for state management
- Day.js for date manipulation
- Axios for HTTP requests

### Backend Technologies
- Node.js runtime environment
- Express.js web framework
- PostgreSQL relational database
- Sequelize ORM for database operations
- JWT for authentication
- Bcrypt for password hashing

### Development Tools
- Create React App for frontend build
- Nodemon for backend development
- ESLint for code quality
- Git for version control

## Project Structure

```
project-root/
├── src/                          Frontend source code
│   ├── components/               React components
│   │   ├── Dashboard.js         Main dashboard with statistics
│   │   ├── Login.js             Authentication login form
│   │   ├── Register.js          User registration form
│   │   ├── Projects.js          Project management interface
│   │   ├── Tasks.js             Task management with filters
│   │   ├── Profile.js           User profile settings
│   │   └── Navbar.js            Navigation bar component
│   ├── context/                  React context providers
│   │   └── AuthContext.js       Authentication state management
│   ├── App.js                    Main application component
│   └── index.js                  Application entry point
├── backend/                      Backend API source code
│   ├── config/                   Configuration files
│   │   └── database.js          Database connection setup
│   ├── models/                   Sequelize models
│   │   ├── User.js              User model with authentication
│   │   ├── Project.js           Project model
│   │   ├── Task.js              Task model
│   │   ├── Comment.js           Comment model
│   │   ├── Notification.js      Notification model
│   │   ├── ProjectMember.js     Project membership model
│   │   └── index.js             Model associations
│   ├── controllers/              Business logic controllers
│   │   ├── auth.controller.js   Authentication logic
│   │   ├── user.controller.js   User management
│   │   ├── project.controller.js Project operations
│   │   ├── task.controller.js   Task operations
│   │   ├── comment.controller.js Comment handling
│   │   └── notification.controller.js Notifications
│   ├── routes/                   API route definitions
│   │   ├── auth.routes.js       Authentication routes
│   │   ├── user.routes.js       User routes
│   │   ├── project.routes.js    Project routes
│   │   ├── task.routes.js       Task routes
│   │   ├── comment.routes.js    Comment routes
│   │   └── notification.routes.js Notification routes
│   ├── middleware/               Custom middleware
│   │   └── auth.js              JWT authentication middleware
│   ├── utils/                    Utility functions
│   │   └── generateToken.js     JWT token generation
│   ├── server.js                 Express server setup
│   └── package.json              Backend dependencies
├── public/                       Static files
├── package.json                  Frontend dependencies
├── vercel.json                   Vercel deployment config
└── README.md                     Project documentation
```

## Installation and Setup

### Prerequisites
- Node.js version 16 or higher
- PostgreSQL version 12 or higher
- npm or yarn package manager
- Git for version control

### Frontend Setup

1. Clone the repository
```bash
git clone https://github.com/Mishra-coder/SeSD-Project.git
cd SeSD-Project
```

2. Install frontend dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The application will open at http://localhost:3000

### Backend Setup

1. Navigate to backend directory
```bash
cd backend
```

2. Install backend dependencies
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

Edit the .env file with your configuration:
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

5. Start the backend server
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The API will be available at http://localhost:5000

## Database Schema

### Core Tables

Users - Stores user accounts and authentication data
Projects - Contains project information and ownership
Tasks - Manages task details and assignments
Comments - Stores task discussion comments
Notifications - Handles user notifications
ProjectMembers - Links users to projects (many-to-many)

### Relationships

- Users own multiple Projects (one-to-many)
- Users belong to multiple Projects through ProjectMembers (many-to-many)
- Projects contain multiple Tasks (one-to-many)
- Users are assigned multiple Tasks (one-to-many)
- Tasks have multiple Comments (one-to-many)
- Users write multiple Comments (one-to-many)
- Users receive multiple Notifications (one-to-many)

## API Documentation

### Authentication Endpoints

POST /api/auth/register - Create new user account
POST /api/auth/login - Authenticate and receive token

### User Endpoints

GET /api/users/me - Get current user profile
PUT /api/users/me - Update profile information
PUT /api/users/me/password - Change password
GET /api/users - List all users (Admin only)

### Project Endpoints

GET /api/projects - Retrieve all projects
POST /api/projects - Create new project
GET /api/projects/:id - Get specific project
PUT /api/projects/:id - Update project details
DELETE /api/projects/:id - Remove project
POST /api/projects/:id/members - Add team member
DELETE /api/projects/:id/members/:userId - Remove member

### Task Endpoints

GET /api/tasks - List tasks with optional filters
POST /api/tasks - Create new task
GET /api/tasks/:id - Get task details
PUT /api/tasks/:id - Update task
DELETE /api/tasks/:id - Remove task

### Comment Endpoints

GET /api/comments - List comments
POST /api/comments - Add new comment
PUT /api/comments/:id - Update comment
DELETE /api/comments/:id - Remove comment

### Notification Endpoints

GET /api/notifications - Get user notifications
PUT /api/notifications/:id/read - Mark as read
PUT /api/notifications/read-all - Mark all as read

## Authentication

Protected routes require JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## User Roles and Permissions

### Team Member
- View assigned tasks
- Update task status
- Add comments to tasks
- Manage personal profile

### Project Manager
All Team Member permissions plus:
- Create and manage projects
- Create and assign tasks
- Add/remove team members
- Delete tasks and comments

### Administrator
All permissions including:
- Manage all users
- Access all projects
- System-wide configuration

## Deployment

### Frontend Deployment on Vercel

1. Push code to GitHub repository
2. Visit https://vercel.com and sign in
3. Import the GitHub repository
4. Vercel auto-detects React configuration
5. Click Deploy

The application will be live with automatic deployments on every push.

### Backend Deployment Options

Recommended platforms:
- Heroku - Easy PostgreSQL integration
- Railway - Modern deployment platform
- DigitalOcean - Full control with droplets
- AWS - Enterprise-grade infrastructure

## Development Workflow

### Frontend Development
```bash
npm start          # Start development server
npm run build      # Create production build
npm test           # Run test suite
```

### Backend Development
```bash
npm run dev        # Start with nodemon
npm start          # Start production server
```

## Testing

### Manual Testing
Use Postman or Thunder Client to test API endpoints with the provided collection.

### Frontend Testing
Test user flows through the application interface with different user roles.

## Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token-based authentication
- Role-based access control (RBAC)
- Input validation on all endpoints
- SQL injection prevention via Sequelize ORM
- XSS protection through React
- CORS configuration for API security

## Browser Compatibility

- Google Chrome (latest)
- Mozilla Firefox (latest)
- Safari (latest)
- Microsoft Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

### Planned Features
- Real-time updates with WebSocket integration
- File attachment support for tasks
- Email notification system
- Advanced search and filtering
- Gantt chart visualization
- Time tracking functionality
- Team chat integration
- Mobile application (React Native)
- Export functionality (PDF, Excel)
- Calendar view for tasks
- Activity logs and audit trails

### Technical Improvements
- Unit and integration testing
- CI/CD pipeline setup
- Performance optimization
- Caching implementation
- Rate limiting
- API documentation with Swagger
- Docker containerization

## Documentation Files

Additional documentation available:
- useCaseDiagram.md - User roles and use cases
- sequenceDiagram.md - System interaction flows
- classDiagram.md - Backend architecture design
- ErDiagram.md - Database schema design
- backend/README.md - Backend API documentation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes with clear messages
4. Push to your branch
5. Submit a pull request with description

## Team Members

Add team member information here

## License

This project is developed for educational purposes as part of the Software Engineering and System Design (SESD) course.

## Acknowledgments

- Material-UI team for the component library
- React team for the framework
- Express.js community
- PostgreSQL development team
- All open-source contributors

## Contact and Support

For questions, issues, or contributions:
- Create an issue in the GitHub repository
- Contact the development team
- Review existing documentation

## Project Status

Current Version: 1.0.0
Status: Active Development
Last Updated: 2024

This is a complete full-stack implementation with both frontend and backend ready for deployment and further development.