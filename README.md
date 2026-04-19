# Task Management System

## SESD Project - React Frontend Implementation

A modern task management web application built with React and Material-UI for teams to manage projects and tasks efficiently.

## Features Implemented

### User Authentication
- Login and Registration forms
- Role-based access (Admin, Project Manager, Team Member)
- Protected routes with authentication context
- Local storage for session persistence

### Dashboard
- Overview statistics (projects, tasks, completion rates)
- Recent tasks display with avatars
- Project progress tracking with visual indicators
- Role-based content visibility
- Trend indicators showing growth percentages

### Project Management
- Create, edit, and delete projects
- Project status tracking (Active, Completed, Archived)
- Team member count display
- Progress visualization with completion percentages
- Color-coded progress bars

### Task Management
- Create, edit, and delete tasks
- Task assignment to team members
- Priority levels (Low, Medium, High, Critical)
- Status tracking (TODO, In Progress, Review, Done)
- Due date management with date picker
- Task filtering (All Tasks, My Tasks, Active, Completed)
- Comments system for collaboration
- Avatar display for assignees

### User Profile
- Personal information management
- Password change functionality
- Role display and management
- Profile picture with user initials
- Account settings

### Modern UI/UX
- Beautiful gradient theme (Purple/Indigo)
- Material-UI components for consistent design
- Responsive layout for all screen sizes
- Glassmorphism effects and modern card designs
- Smooth animations and hover effects
- Professional Inter font typography
- Notification badge in navigation
- Loading states and error handling

## Tech Stack

### Frontend
- React 18 - Modern React with hooks
- Material-UI (MUI) 5 - Component library and theming
- React Router 6 - Client-side routing
- Day.js - Date manipulation
- Context API - State management for authentication

### Development Tools
- Create React App - Build tooling
- ESLint - Code linting
- React Scripts - Development server

## Project Structure

```
src/
├── components/
│   ├── Dashboard.js     - Main dashboard with statistics
│   ├── Login.js         - Login form with validation
│   ├── Register.js      - Registration form
│   ├── Projects.js      - Project management interface
│   ├── Tasks.js         - Task management with filters
│   ├── Profile.js       - User profile settings
│   └── Navbar.js        - Navigation bar with menu
├── context/
│   └── AuthContext.js   - Authentication context provider
├── App.js               - Main app component with routing
└── index.js             - App entry point with theme
```

## Installation and Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Local Development

1. Clone the repository
```bash
git clone https://github.com/Mishra-coder/SeSD-Project.git
cd SeSD-Project
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open your browser and navigate to
```
http://localhost:3000
```

### Build for Production

Create an optimized production build:
```bash
npm run build
```

The build folder will contain the production-ready files.

## Deployment on Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com and sign up/login
2. Click "Add New Project"
3. Import your GitHub repository (https://github.com/Mishra-coder/SeSD-Project)
4. Vercel will automatically detect it's a React app
5. Click "Deploy"
6. Your app will be live in 2-3 minutes

### Method 2: Deploy via Vercel CLI

1. Install Vercel CLI globally
```bash
npm install -g vercel
```

2. Login to Vercel
```bash
vercel login
```

3. Deploy from project directory
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? Yes
   - Which scope? Select your account
   - Link to existing project? No
   - Project name? (press enter for default)
   - Directory? ./ (press enter)
   - Override settings? No

5. For production deployment
```bash
vercel --prod
```

### Vercel Configuration

Create a `vercel.json` file in the root directory (optional):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "devCommand": "npm start",
  "framework": "create-react-app"
}
```

### Environment Variables (if needed)

If you add backend API later, set environment variables in Vercel:
1. Go to your project in Vercel Dashboard
2. Click "Settings"
3. Click "Environment Variables"
4. Add your variables (e.g., REACT_APP_API_URL)

## Usage

### Demo Login
The app uses mock authentication. You can login with any email and password:
- Email: any valid email format
- Password: any password

### User Roles
During registration, you can select:
- Team Member - Can view and update assigned tasks
- Project Manager - Can create projects and manage tasks
- Admin - Full access to all features

### Key Features Demo

1. Authentication Flow
   - Register a new account with your preferred role
   - Login with your credentials
   - Access role-based features

2. Dashboard
   - View project and task statistics
   - See recent task activity
   - Monitor project progress
   - Check overdue items

3. Project Management
   - Navigate to Projects tab
   - Create new projects (Project Manager/Admin only)
   - Edit project details
   - Track progress and team members

4. Task Management
   - Navigate to Tasks tab
   - Create tasks with assignments
   - Set priorities and due dates
   - Filter tasks by status
   - Update task status
   - View and add comments

5. Profile Settings
   - Update personal information
   - Change password
   - Manage account settings

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

### Backend Integration
- Connect to REST API
- Real-time updates with WebSocket
- File upload functionality
- Email notifications
- Database persistence

### Additional Features
- Advanced search and filtering
- Gantt chart view
- Time tracking
- Team chat integration
- Export reports
- Mobile app version

## Documentation Files

This project includes detailed documentation:
- useCaseDiagram.md - User roles and capabilities
- sequenceDiagram.md - Task creation workflow
- classDiagram.md - Backend structure design
- ErDiagram.md - Database schema design

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for educational purposes as part of the SESD course.

## Team Members

Add your team member names here

## Contact

For questions or issues, please create an issue in the GitHub repository.

## Acknowledgments

- Material-UI for the component library
- React team for the amazing framework
- Create React App for the build setup

---

Note: This is a frontend-only implementation with mock data. For a complete solution, integrate with a backend API following the specifications in the documentation files.