import api from './api';

const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.success && response.data.data.token) {
      const user = {
        ...response.data.data.user,
        token: response.data.data.token
      };
      localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.success && response.data.data.token) {
      const user = {
        ...response.data.data.user,
        token: response.data.data.token
      };
      localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

export default authService;