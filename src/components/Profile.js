import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Avatar,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import {
  Email as EmailIcon,
  Work as WorkIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    role: user?.role || 'TEAM_MEMBER',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const updatedUser = {
        ...user,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        role: formData.role
      };
      
      login(updatedUser);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!formData.currentPassword || !formData.newPassword) {
        setError('Please fill in all password fields');
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError('New passwords do not match');
        return;
      }

      if (formData.newPassword.length < 6) {
        setError('New password must be at least 6 characters');
        return;
      }

      setSuccess('Password changed successfully!');
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError('Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'ADMIN': return 'Administrator';
      case 'PROJECT_MANAGER': return 'Project Manager';
      case 'TEAM_MEMBER': return 'Team Member';
      default: return role;
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile Settings
      </Typography>

      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Grid container spacing={3}>
        {/* Profile Overview */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '2rem'
                }}
              >
                {getInitials(user?.firstName, user?.lastName)}
              </Avatar>
              
              <Typography variant="h5" gutterBottom>
                {user?.firstName} {user?.lastName}
              </Typography>
              
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {getRoleDisplayName(user?.role)}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={1}>
                <EmailIcon color="action" fontSize="small" />
                <Typography variant="body2" color="textSecondary">
                  {user?.email}
                </Typography>
              </Box>
              
              <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                <WorkIcon color="action" fontSize="small" />
                <Typography variant="body2" color="textSecondary">
                  {getRoleDisplayName(user?.role)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Form */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              
              <Box component="form" onSubmit={handleProfileUpdate}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      margin="normal"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      margin="normal"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      margin="normal"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Role</InputLabel>
                      <Select
                        name="role"
                        value={formData.role}
                        label="Role"
                        onChange={handleChange}
                        disabled={user?.role !== 'ADMIN'}
                      >
                        <MenuItem value="TEAM_MEMBER">Team Member</MenuItem>
                        <MenuItem value="PROJECT_MANAGER">Project Manager</MenuItem>
                        <MenuItem value="ADMIN">Administrator</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SaveIcon />}
                  sx={{ mt: 2 }}
                  disabled={loading}
                >
                  Update Profile
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Password Change */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Change Password
              </Typography>
              
              <Box component="form" onSubmit={handlePasswordChange}>
                <TextField
                  fullWidth
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  margin="normal"
                />
                
                <TextField
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  margin="normal"
                />
                
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  margin="normal"
                />
                
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2 }}
                  disabled={loading}
                >
                  Change Password
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;