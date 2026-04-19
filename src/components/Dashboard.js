import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  IconButton,
  Button
} from '@mui/material';
import {
  Assignment as TaskIcon,
  Folder as ProjectIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  MoreVert as MoreIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    overdueTasks: 0
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setStats({
      totalProjects: 5,
      totalTasks: 23,
      completedTasks: 15,
      overdueTasks: 3
    });

    setRecentTasks([
      {
        id: 1,
        title: 'Fix login authentication bug',
        project: 'Web Application',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        dueDate: '2024-01-20',
        assignee: 'John Doe'
      },
      {
        id: 2,
        title: 'Update API documentation',
        project: 'Backend Service',
        priority: 'MEDIUM',
        status: 'TODO',
        dueDate: '2024-01-25',
        assignee: 'Jane Smith'
      },
      {
        id: 3,
        title: 'Code review for payment module',
        project: 'E-commerce Platform',
        priority: 'HIGH',
        status: 'REVIEW',
        dueDate: '2024-01-22',
        assignee: 'Mike Johnson'
      },
      {
        id: 4,
        title: 'Design user dashboard mockups',
        project: 'Mobile App',
        priority: 'LOW',
        status: 'DONE',
        dueDate: '2024-01-18',
        assignee: 'Sarah Wilson'
      }
    ]);

    setProjects([
      {
        id: 1,
        name: 'E-commerce Platform',
        progress: 75,
        totalTasks: 12,
        completedTasks: 9,
        color: '#6366f1'
      },
      {
        id: 2,
        name: 'Mobile Banking App',
        progress: 45,
        totalTasks: 8,
        completedTasks: 4,
        color: '#10b981'
      },
      {
        id: 3,
        name: 'Analytics Dashboard',
        progress: 90,
        totalTasks: 10,
        completedTasks: 9,
        color: '#f59e0b'
      }
    ]);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return 'error';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'info';
      case 'CRITICAL': return 'error';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'DONE': return 'success';
      case 'IN_PROGRESS': return 'primary';
      case 'REVIEW': return 'warning';
      case 'TODO': return 'default';
      default: return 'default';
    }
  };

  const StatCard = ({ icon, title, value, color, trend }) => (
    <Card 
      sx={{ 
        height: '100%',
        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        border: `1px solid ${color}20`,
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 25px ${color}20`,
        }
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color }}>
              {value}
            </Typography>
            {trend && (
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                <Typography variant="body2" color="success.main">
                  +{trend}% from last week
                </Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Good morning, {user?.firstName}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your projects today.
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            icon={<ProjectIcon sx={{ fontSize: 28 }} />}
            title="Active Projects"
            value={stats.totalProjects}
            color="#6366f1"
            trend={12}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            icon={<TaskIcon sx={{ fontSize: 28 }} />}
            title="Total Tasks"
            value={stats.totalTasks}
            color="#10b981"
            trend={8}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            icon={<CheckIcon sx={{ fontSize: 28 }} />}
            title="Completed"
            value={stats.completedTasks}
            color="#f59e0b"
            trend={15}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            icon={<WarningIcon sx={{ fontSize: 28 }} />}
            title="Overdue"
            value={stats.overdueTasks}
            color="#ef4444"
          />
        </Grid>

        {/* Recent Tasks */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Recent Tasks
                </Typography>
                <Button
                  size="small"
                  onClick={() => navigate('/tasks')}
                  sx={{ textTransform: 'none' }}
                >
                  View All
                </Button>
              </Box>
              
              <List sx={{ p: 0 }}>
                {recentTasks.map((task, index) => (
                  <React.Fragment key={task.id}>
                    <ListItem 
                      sx={{ 
                        px: 0,
                        py: 2,
                        '&:hover': {
                          backgroundColor: 'action.hover',
                          borderRadius: 2,
                        }
                      }}
                    >
                      <ListItemIcon>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: getStatusColor(task.status) + '.main',
                            fontSize: '0.875rem'
                          }}
                        >
                          {task.assignee.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {task.title}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {task.project} • Due: {task.dueDate}
                            </Typography>
                            <Box display="flex" gap={1}>
                              <Chip
                                label={task.priority}
                                color={getPriorityColor(task.priority)}
                                size="small"
                                sx={{ height: 20, fontSize: '0.75rem' }}
                              />
                              <Chip
                                label={task.status.replace('_', ' ')}
                                color={getStatusColor(task.status)}
                                size="small"
                                sx={{ height: 20, fontSize: '0.75rem' }}
                              />
                            </Box>
                          </Box>
                        }
                      />
                      <IconButton size="small">
                        <MoreIcon />
                      </IconButton>
                    </ListItem>
                    {index < recentTasks.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Project Progress */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Project Progress
                </Typography>
                <IconButton 
                  size="small"
                  onClick={() => navigate('/projects')}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    }
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
              
              {projects.map((project) => (
                <Box key={project.id} sx={{ mb: 3 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {project.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.progress}%
                    </Typography>
                  </Box>
                  
                  <LinearProgress
                    variant="determinate"
                    value={project.progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: `${project.color}20`,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: project.color,
                        borderRadius: 4,
                      }
                    }}
                  />
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <Typography variant="body2" color="text.secondary">
                      {project.completedTasks}/{project.totalTasks} tasks completed
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <ScheduleIcon sx={{ fontSize: 14, color: 'text.secondary', mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        2 days left
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;