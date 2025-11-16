/**
 * Axios Instance Configuration for AI-VERSE AI Platform
 * 
 * This file sets up axios with interceptors for:
 * - Authentication token injection
 * - Request/response logging
 * - Error handling
 * - Response transformation
 */

import axios from 'axios';
import toast from 'react-hot-toast';

// Base URL from environment variable or default
const BASE_URL = "https://college-minor-project-e72h.onrender.com";

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API Request:', {
        method: config.method.toUpperCase(),
        url: config.url,
        data: config.data,
      });
    }

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - Clear auth and redirect
          localStorage.removeItem('authToken');
          toast.error('Session expired. Please login again.');
          window.location.href = '/login';
          break;
        
        case 403:
          toast.error('Access forbidden');
          break;
        
        case 404:
          toast.error('Resource not found');
          break;
        
        case 429:
          toast.error('Too many requests. Please try again later.');
          break;
        
        case 500:
          toast.error('Server error. Please try again.');
          break;
        
        default:
          // Show error message from server if available
          const errorMessage = data?.error || data?.message || 'An error occurred';
          toast.error(errorMessage);
      }

      console.error('❌ API Error:', {
        status,
        url: error.config.url,
        message: data?.error || data?.message,
      });
    } else if (error.request) {
      // Request made but no response
      toast.error('Network error. Please check your connection.');
      console.error('❌ Network Error:', error.request);
    } else {
      // Error in request setup
      toast.error('Request failed. Please try again.');
      console.error('❌ Request Setup Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// API endpoints object for organized API calls
export const API = {
  // Auth endpoints
  auth: {
    register: (data) => apiClient.post('/api/v1/auth/register', data),
    login: (data) => apiClient.post('/api/v1/auth/login', data),
    logout: () => apiClient.post('/api/v1/auth/logout'),
  },
  
  // OpenAI endpoints
  openai: {
    summary: (text) => apiClient.post('/api/v1/openai/summary', { text }),
    paragraph: (text) => apiClient.post('/api/v1/openai/paragraph', { text }),
    chatbot: (text) => apiClient.post('/api/v1/openai/chatbot', { text }),
    jsConverter: (text) => apiClient.post('/api/v1/openai/js-converter', { text }),
    scifiImage: (text) => apiClient.post('/api/v1/openai/scifi-image', { text }),
  },
  
  // Chat endpoints (for conversation management)
  chat: {
    getConversations: () => apiClient.get('/api/v1/chat/conversations'),
    getConversation: (id) => apiClient.get(`/api/v1/chat/conversations/${id}`),
    createConversation: (data) => apiClient.post('/api/v1/chat/conversations', data),
    updateConversation: (id, data) => apiClient.patch(`/api/v1/chat/conversations/${id}`, data),
    deleteConversation: (id) => apiClient.delete(`/api/v1/chat/conversations/${id}`),
    sendMessage: (conversationId, message) => 
      apiClient.post(`/api/v1/chat/conversations/${conversationId}/messages`, { message }),
  },
};

// Export axios instance as default
export default apiClient;
