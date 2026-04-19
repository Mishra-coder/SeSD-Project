import api from './api';

const notificationService = {
  getMyNotifications: async (isRead) => {
    const params = isRead !== undefined ? `?isRead=${isRead}` : '';
    const response = await api.get(`/notifications${params}`);
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  markAllAsRead: async () => {
    const response = await api.put('/notifications/read-all');
    return response.data;
  },

  deleteNotification: async (id) => {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await notificationService.getMyNotifications(false);
    return response.count || 0;
  }
};

export default notificationService;