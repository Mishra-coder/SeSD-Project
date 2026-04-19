export const USER_ROLES = {
  ADMIN: 'ADMIN',
  PROJECT_MANAGER: 'PROJECT_MANAGER',
  TEAM_MEMBER: 'TEAM_MEMBER'
};

export const TASK_STATUS = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  REVIEW: 'REVIEW',
  DONE: 'DONE'
};

export const TASK_PRIORITY = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

export const PROJECT_STATUS = {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED'
};

export const NOTIFICATION_TYPES = {
  TASK_ASSIGNED: 'TASK_ASSIGNED',
  TASK_UPDATED: 'TASK_UPDATED',
  COMMENT_ADDED: 'COMMENT_ADDED',
  PROJECT_UPDATED: 'PROJECT_UPDATED'
};

export const STATUS_COLORS = {
  TODO: 'default',
  IN_PROGRESS: 'primary',
  REVIEW: 'warning',
  DONE: 'success'
};

export const PRIORITY_COLORS = {
  LOW: 'info',
  MEDIUM: 'warning',
  HIGH: 'error',
  CRITICAL: 'error'
};

export const ROLE_LABELS = {
  ADMIN: 'Administrator',
  PROJECT_MANAGER: 'Project Manager',
  TEAM_MEMBER: 'Team Member'
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
  },
  USERS: {
    ME: '/users/me',
    ALL: '/users'
  },
  PROJECTS: {
    ALL: '/projects',
    BY_ID: (id) => `/projects/${id}`,
    MEMBERS: (id) => `/projects/${id}/members`
  },
  TASKS: {
    ALL: '/tasks',
    BY_ID: (id) => `/tasks/${id}`
  },
  COMMENTS: {
    ALL: '/comments',
    BY_ID: (id) => `/comments/${id}`
  },
  NOTIFICATIONS: {
    ALL: '/notifications',
    READ: (id) => `/notifications/${id}/read`,
    READ_ALL: '/notifications/read-all'
  }
};