import api from './api';

const userService = {
  getMe: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  updateMe: async (userData) => {
    const response = await api.put('/users/me', userData);
    return response.data;
  },

  updatePassword: async (passwordData) => {
    const response = await api.put('/users/me/password', passwordData);
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  getUser: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};

export default userService;