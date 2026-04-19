# Task Management System

## SESD Project - React Frontend Implementation

A modern task management web application built with React and Material-UI for teams to manage projects and tasks efficiently.

## 🚀 Features Implemented

### ✅ User Authentication
- Login and Registration forms
- Role-based access (Admin, Project Manager, Team Member)
- Protected routes with authentication context
- Local storage for session persistence

### ✅ Dashboard
- Overview statistics (projects, tasks, completion rates)
- Recent tasks display
- Project progress tracking
- Role-based content visibility

### ✅ Project Management
- Create, edit, and delete projects
- Project status tracking (Active, Completed, Archived)
- Team member management
- Progress visualization with completion percentages

### ✅ Task Management
- Create, edit, and delete tasks
- Task assignment to team members
- Priority levels (Low, Medium, High, Critical)
- Status tracking (TODO, In Progress, Review, Done)
- Due date management
- Task filtering (All, My Tasks, Active, Completed)
- Comments system for collaboration

### ✅ User Profile
- Personal information management
- Password change functionality
- Role display and management
- Profile picture with initials

### ✅ Modern UI/UX
- Material-UI components for consistent design
- Responsive layout for all screen sizes
- Dark/light theme support
- Intuitive navigation with sidebar
- Loading states and error handling

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Material-UI (MUI) 5** - Component library and theming
- **React Router 6** - Client-side routing
- **Day.js** - Date manipulation
- **Context API** - State management for authentication

### Development Tools
- **Create React App** - Build tooling
- **ESLint** - Code linting
- **React Scripts** - Development server

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Dashboard.js     # Main dashboard
│   ├── Login.js         # Login form
│   ├── Register.js      # Registration form
│   ├── Projects.js      # Project management
│   ├── Tasks.js         # Task management
│   ├── Profile.js       # User profile
│   └── Navbar.js        # Navigation bar
├── context/             # React context
│   └── AuthContext.js   # Authentication context
├── App.js              # Main app component
└── index.js            # App entry point
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 👤 Demo Users

The app uses mock authentication. You can login with any email/password combination:

- **Admin User**: Any email with role selection
- **Project Manager**: Can create/manage projects and tasks
- **Team Member**: Can view and update assigned tasks

## 🎯 Key Features Demo

### Authentication Flow
1. Visit the app - redirects to login
2. Register a new account or login
3. Choose your role during registration
4. Access role-based features

### Project Management
1. Navigate to Projects tab
2. Create new project (Project Manager/Admin only)
3. View project progress and statistics
4. Edit or delete projects

### Task Management
1. Navigate to Tasks tab
2. Create new tasks with assignments
3. Filter tasks by status or assignee
4. Update task status and add comments
5. Set priorities and due dates

### Dashboard Overview
1. View summary statistics
2. See recent task activity
3. Monitor project progress
4. Quick access to overdue items

## 🔧 Customization

### Theming
The app uses Material-UI's theming system. Modify `src/index.js` to customize:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Change primary color
    },
    secondary: {
      main: '#dc004e', // Change secondary color
    },
  },
});
```

### Adding New Features
1. Create new components in `src/components/`
2. Add routes in `src/App.js`
3. Update navigation in `src/components/Navbar.js`
4. Extend context if needed

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🔒 Security Features

- Protected routes with authentication
- Role-based access control
- Form validation
- XSS protection through React
- Secure local storage usage

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The build folder can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any static hosting service

## 📋 Future Enhancements

### Backend Integration
- Connect to REST API
- Real-time updates with WebSocket
- File upload functionality
- Email notifications

### Additional Features
- Advanced filtering and search
- Gantt chart view
- Time tracking
- Team chat integration
- Mobile app version

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for educational purposes as part of the SESD course.

## 📞 Support

For questions or issues:
1. Check the documentation
2. Review existing issues
3. Create a new issue with detailed description

---

**Note**: This is a frontend-only implementation with mock data. For a complete solution, integrate with a backend API following the original project specifications in the documentation files.
