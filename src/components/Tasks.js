import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Menu,
  MenuItem as MenuItemComponent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Tab,
  Tabs
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Comment as CommentIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: '',
    assigneeId: '',
    priority: 'MEDIUM',
    status: 'TODO',
    dueDate: null
  });

  const projects = [
    { id: 1, name: 'E-commerce Website' },
    { id: 2, name: 'Mobile Banking App' },
    { id: 3, name: 'Data Analytics Dashboard' }
  ];

  const teamMembers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com' }
  ];

  useEffect(() => {
    setTasks([
      {
        id: 1,
        title: 'Implement user authentication',
        description: 'Add login and registration functionality with JWT tokens',
        project: 'E-commerce Website',
        assignee: 'John Doe',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        dueDate: '2024-01-25',
        createdAt: '2024-01-15',
        comments: [
          { id: 1, author: 'Jane Smith', content: 'Working on the backend API', createdAt: '2024-01-16' }
        ]
      },
      {
        id: 2,
        title: 'Design product catalog UI',
        description: 'Create responsive product listing and detail pages',
        project: 'E-commerce Website',
        assignee: 'Jane Smith',
        priority: 'MEDIUM',
        status: 'TODO',
        dueDate: '2024-01-30',
        createdAt: '2024-01-14',
        comments: []
      },
      {
        id: 3,
        title: 'Setup payment gateway',
        description: 'Integrate Stripe payment processing',
        project: 'E-commerce Website',
        assignee: 'Mike Johnson',
        priority: 'HIGH',
        status: 'REVIEW',
        dueDate: '2024-01-28',
        createdAt: '2024-01-12',
        comments: [
          { id: 2, author: 'John Doe', content: 'Please test with sandbox environment', createdAt: '2024-01-17' },
          { id: 3, author: 'Mike Johnson', content: 'Testing completed, ready for review', createdAt: '2024-01-18' }
        ]
      },
      {
        id: 4,
        title: 'Implement push notifications',
        description: 'Add real-time notifications for transactions',
        project: 'Mobile Banking App',
        assignee: 'John Doe',
        priority: 'MEDIUM',
        status: 'DONE',
        dueDate: '2024-01-20',
        createdAt: '2024-01-10',
        comments: []
      }
    ]);
  }, []);

  const handleOpenDialog = (task = null) => {
    setSelectedTask(task);
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        projectId: projects.find(p => p.name === task.project)?.id || '',
        assigneeId: teamMembers.find(m => m.name === task.assignee)?.id || '',
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate ? dayjs(task.dueDate) : null
      });
    } else {
      setFormData({
        title: '',
        description: '',
        projectId: '',
        assigneeId: '',
        priority: 'MEDIUM',
        status: 'TODO',
        dueDate: null
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTask(null);
  };

  const handleSubmit = () => {
    const project = projects.find(p => p.id === formData.projectId);
    const assignee = teamMembers.find(m => m.id === formData.assigneeId);
    
    if (selectedTask) {
      setTasks(tasks.map(t => 
        t.id === selectedTask.id 
          ? { 
              ...t, 
              ...formData,
              project: project?.name || t.project,
              assignee: assignee?.name || t.assignee,
              dueDate: formData.dueDate ? formData.dueDate.format('YYYY-MM-DD') : null
            }
          : t
      ));
    } else {
      const newTask = {
        id: Date.now(),
        ...formData,
        project: project?.name || '',
        assignee: assignee?.name || '',
        dueDate: formData.dueDate ? formData.dueDate.format('YYYY-MM-DD') : null,
        createdAt: new Date().toISOString().split('T')[0],
        comments: []
      };
      setTasks([...tasks, newTask]);
    }
    handleCloseDialog();
  };

  const handleMenuClick = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };

  const handleDelete = () => {
    setTasks(tasks.filter(t => t.id !== selectedTask.id));
    handleMenuClose();
  };

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

  const filterTasksByTab = (tasks, tabValue) => {
    switch (tabValue) {
      case 0: return tasks;
      case 1: return tasks.filter(t => t.assignee === `${user?.firstName} ${user?.lastName}`);
      case 2: return tasks.filter(t => t.status !== 'DONE');
      case 3: return tasks.filter(t => t.status === 'DONE');
      default: return tasks;
    }
  };

  const filteredTasks = filterTasksByTab(tasks, tabValue);
  const canManageTasks = user?.role === 'PROJECT_MANAGER' || user?.role === 'ADMIN';

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">
            Tasks
          </Typography>
          {canManageTasks && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              New Task
            </Button>
          )}
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="All Tasks" />
            <Tab label="My Tasks" />
            <Tab label="Active" />
            <Tab label="Completed" />
          </Tabs>
        </Box>

        <Grid container spacing={3}>
          {filteredTasks.map((task) => (
            <Grid item xs={12} md={6} lg={4} key={task.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" gutterBottom>
                      {task.title}
                    </Typography>
                    {canManageTasks && (
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, task)}
                      >
                        <MoreIcon />
                      </IconButton>
                    )}
                  </Box>
                  
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {task.description}
                  </Typography>
                  
                  <Box display="flex" gap={1} mb={2}>
                    <Chip
                      label={task.priority}
                      color={getPriorityColor(task.priority)}
                      size="small"
                    />
                    <Chip
                      label={task.status}
                      color={getStatusColor(task.status)}
                      size="small"
                    />
                  </Box>
                  
                  <Box mb={2}>
                    <Typography variant="body2" color="textSecondary">
                      Project: {task.project}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={0.5} mt={1}>
                      <PersonIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="textSecondary">
                        {task.assignee}
                      </Typography>
                    </Box>
                    {task.dueDate && (
                      <Box display="flex" alignItems="center" gap={0.5} mt={1}>
                        <CalendarIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="textSecondary">
                          Due: {task.dueDate}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  
                  {task.comments.length > 0 && (
                    <Box>
                      <Box display="flex" alignItems="center" gap={0.5} mb={1}>
                        <CommentIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="textSecondary">
                          {task.comments.length} comment{task.comments.length !== 1 ? 's' : ''}
                        </Typography>
                      </Box>
                      <List dense>
                        {task.comments.slice(0, 2).map((comment) => (
                          <ListItem key={comment.id} sx={{ px: 0 }}>
                            <ListItemAvatar>
                              <Avatar sx={{ width: 24, height: 24 }}>
                                {comment.author.charAt(0)}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={comment.content}
                              secondary={comment.author}
                              primaryTypographyProps={{ variant: 'body2' }}
                              secondaryTypographyProps={{ variant: 'caption' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Task Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {selectedTask ? 'Edit Task' : 'Create New Task'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Task Title"
                  fullWidth
                  variant="outlined"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Description"
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Project</InputLabel>
                  <Select
                    value={formData.projectId}
                    label="Project"
                    onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                  >
                    {projects.map((project) => (
                      <MenuItem key={project.id} value={project.id}>
                        {project.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Assignee</InputLabel>
                  <Select
                    value={formData.assigneeId}
                    label="Assignee"
                    onChange={(e) => setFormData({ ...formData, assigneeId: e.target.value })}
                  >
                    {teamMembers.map((member) => (
                      <MenuItem key={member.id} value={member.id}>
                        {member.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={formData.priority}
                    label="Priority"
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  >
                    <MenuItem value="LOW">Low</MenuItem>
                    <MenuItem value="MEDIUM">Medium</MenuItem>
                    <MenuItem value="HIGH">High</MenuItem>
                    <MenuItem value="CRITICAL">Critical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    label="Status"
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <MenuItem value="TODO">To Do</MenuItem>
                    <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                    <MenuItem value="REVIEW">Review</MenuItem>
                    <MenuItem value="DONE">Done</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <DatePicker
                  label="Due Date"
                  value={formData.dueDate}
                  onChange={(newValue) => setFormData({ ...formData, dueDate: newValue })}
                  renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {selectedTask ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Context Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItemComponent onClick={() => { handleOpenDialog(selectedTask); handleMenuClose(); }}>
            Edit
          </MenuItemComponent>
          <MenuItemComponent onClick={handleDelete}>
            Delete
          </MenuItemComponent>
        </Menu>
      </Box>
    </LocalizationProvider>
  );
};

export default Tasks;