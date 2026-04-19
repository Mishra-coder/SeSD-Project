import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Badge
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  Assignment as TaskIcon,
  Folder as ProjectIcon,
  AccountCircle,
  ExitToApp,
  Person,
  Notifications,
  Settings
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <AppBar position="static" elevation={0} sx={{ 
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }}>
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              backdropFilter: 'blur(10px)',
            }}
          >
            <TaskIcon sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #ffffff 30%, #e0e7ff 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            TaskFlow
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button 
            color="inherit" 
            startIcon={<DashboardIcon />}
            onClick={() => navigate('/dashboard')}
            sx={{ 
              borderRadius: 2,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }
            }}
          >
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>Dashboard</Box>
          </Button>
          
          <Button 
            color="inherit" 
            startIcon={<ProjectIcon />}
            onClick={() => navigate('/projects')}
            sx={{ 
              borderRadius: 2,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }
            }}
          >
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>Projects</Box>
          </Button>
          
          <Button 
            color="inherit" 
            startIcon={<TaskIcon />}
            onClick={() => navigate('/tasks')}
            sx={{ 
              borderRadius: 2,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
              }
            }}
          >
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>Tasks</Box>
          </Button>

          <IconButton
            color="inherit"
            sx={{ 
              ml: 1,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton
            onClick={handleMenu}
            sx={{ 
              ml: 1,
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)',
              }
            }}
          >
            <Avatar 
              sx={{ 
                width: 36, 
                height: 36,
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.875rem',
                border: '2px solid rgba(255,255,255,0.3)'
              }}
            >
              {getInitials(user?.firstName, user?.lastName)}
            </Avatar>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                borderRadius: 2,
                boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
                border: '1px solid #e2e8f0',
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #e2e8f0' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
            
            <MenuItem onClick={() => { navigate('/profile'); handleClose(); }} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile Settings</ListItemText>
            </MenuItem>
            
            <MenuItem onClick={() => { handleClose(); }} sx={{ py: 1.5 }}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText>Preferences</ListItemText>
            </MenuItem>
            
            <Divider />
            
            <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: 'error.main' }}>
              <ListItemIcon>
                <ExitToApp fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText>Sign Out</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;