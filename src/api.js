import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://mindcare-backend-1diu.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const authAPI = {
  login: (data) => api.post('/api/auth/login', data),
  register: (data) => api.post('/api/auth/register', data),
  getMe: () => api.get('/api/auth/me'),
};

// Profile APIs
export const profileAPI = {
  update: (data) => api.put('/api/profile', data),
};

// Medication APIS
export const medicationAPI = {
  getAll: () => api.get('/api/medications'),
  create: (data) => api.post('/api/medications', data),
  update: (id, data) => api.put(`/api/medications/${id}`, data),
  delete: (id) => api.delete(`/api/medications/${id}`),
};

// Appointment APIs
export const appointmentAPI = {
  getAll: () => api.get('/api/appointments'),
  create: (data) => api.post('/api/appointments', data),
  update: (id, data) => api.put(`/api/appointments/${id}`, data),
  delete: (id) => api.delete(`/api/appointments/${id}`),
};

// Forum APIs
export const forumAPI = {
  getPosts: (category) => api.get(`/api/forum/posts${category ? `?category=${category}` : ''}`),
  getPost: (id) => api.get(`/api/forum/posts/${id}`),
  createPost: (data) => api.post('/api/forum/posts', data),
  createReply: (postId, data) => api.post(`/api/forum/posts/${postId}/replies`, data),
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: () => api.get('/api/dashboard/stats'),
};

export default api;
