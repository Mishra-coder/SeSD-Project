import api from './api';

const taskService = {
  getAllTasks: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/tasks${params ? `?${params}` : ''}`);
    return response.data;
  },

  getTask: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  getTasksByProject: async (projectId) => {
    return taskService.getAllTasks({ projectId });
  },

  getTasksByAssignee: async (assigneeId) => {
    return taskService.getAllTasks({ assigneeId });
  },

  getTasksByStatus: async (status) => {
    return taskService.getAllTasks({ status });
  }
};

export default taskService;