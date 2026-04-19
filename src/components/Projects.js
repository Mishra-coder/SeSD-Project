import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
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
  LinearProgress
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreIcon,
  People as PeopleIcon,
  Assignment as TaskIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'ACTIVE'
  });

  useEffect(() => {
    // Mock data - in real app, this would come from API
    setProjects([
      {
        id: 1,
        name: 'E-commerce Website',
        description: 'Building a modern e-commerce platform with React and Node.js',
        status: 'ACTIVE',
        owner: 'John Doe',
        teamMembers: 5,
        totalTasks: 15,
        completedTasks: 8,
        progress: 53,
        createdAt: '2024-01-10'
      },
      {
        id: 2,
        name: 'Mobile Banking App',
        description: 'Secure mobile banking application for iOS and Android',
        status: 'ACTIVE',
        owner: 'Jane Smith',
        teamMembers: 8,
        totalTasks: 22,
        completedTasks: 18,
        progress: 82,
        createdAt: '2024-01-05'
      },
      {
        id: 3,
        name: 'Data Analytics Dashboard',
        description: 'Real-time analytics dashboard for business intelligence',
        status: 'COMPLETED',
        owner: 'Mike Johnson',
        teamMembers: 4,
        totalTasks: 12,
        completedTasks: 12,
        progress: 100,
        createdAt: '2023-12-20'
      }
    ]);
  }, []);

  const handleOpenDialog = (project = null) => {
    setSelectedProject(project);
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        status: project.status
      });
    } else {
      setFormData({
        name: '',
        description: '',
        status: 'ACTIVE'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProject(null);
    setFormData({
      name: '',
      description: '',
      status: 'ACTIVE'
    });
  };

  const handleSubmit = () => {
    if (selectedProject) {
      // Update project
      setProjects(projects.map(p => 
        p.id === selectedProject.id 
          ? { ...p, ...formData }
          : p
      ));
    } else {
      // Create new project
      const newProject = {
        id: Date.now(),
        ...formData,
        owner: `${user.firstName} ${user.lastName}`,
        teamMembers: 1,
        totalTasks: 0,
        completedTasks: 0,
        progress: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setProjects([...projects, newProject]);
    }
    handleCloseDialog();
  };

  const handleMenuClick = (event, project) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProject(null);
  };

  const handleDelete = () => {
    setProjects(projects.filter(p => p.id !== selectedProject.id));
    handleMenuClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'COMPLETED': return 'primary';
      case 'ARCHIVED': return 'default';
      default: return 'default';
    }
  };

  const canManageProjects = user?.role === 'PROJECT_MANAGER' || user?.role === 'ADMIN';

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Projects
        </Typography>
        {canManageProjects && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            New Project
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} md={6} lg={4} key={project.id}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Typography variant="h6" gutterBottom>
                    {project.name}
                  </Typography>
                  {canManageProjects && (
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, project)}
                    >
                      <MoreIcon />
                    </IconButton>
                  )}
                </Box>
                
                <Typography variant="body2" color="textSecondary" paragraph>
                  {project.description}
                </Typography>
                
                <Box display="flex" gap={1} mb={2}>
                  <Chip
                    label={project.status}
                    color={getStatusColor(project.status)}
                    size="small"
                  />
                </Box>
                
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <PeopleIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="textSecondary">
                      {project.teamMembers} members
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <TaskIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="textSecondary">
                      {project.completedTasks}/{project.totalTasks} tasks
                    </Typography>
                  </Box>
                </Box>
                
                <Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="body2" color="textSecondary">
                      Progress
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {project.progress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={project.progress}
                    sx={{ height: 6, borderRadius: 3 }}
                  />
                </Box>
              </CardContent>
              
              <CardActions>
                <Button size="small">View Details</Button>
                <Button size="small">View Tasks</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Project Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedProject ? 'Edit Project' : 'Create New Project'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="COMPLETED">Completed</MenuItem>
              <MenuItem value="ARCHIVED">Archived</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedProject ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItemComponent onClick={() => { handleOpenDialog(selectedProject); handleMenuClose(); }}>
          Edit
        </MenuItemComponent>
        <MenuItemComponent onClick={handleDelete}>
          Delete
        </MenuItemComponent>
      </Menu>
    </Box>
  );
};

export default Projects;