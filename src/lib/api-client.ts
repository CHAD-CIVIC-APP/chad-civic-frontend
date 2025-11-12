import axios from 'axios';
import type { PaginatedResponse } from '@/models';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is required. Please set it in your .env file.');
}

// Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle Strapi-style responses (unwrap data)
apiClient.interceptors.response.use((response) => {
  // Store original response in config for pagination access
  (response.config as any).__originalData = response.data;
  
  // If response has data.data, unwrap it (Strapi format)
  if (response.data?.data !== undefined) {
    return { ...response, data: response.data.data };
  }
  return response;
});

/**
 * API methods
 */
export const api = {
  get: <T>(endpoint: string, params?: Record<string, unknown>) =>
    apiClient.get<T>(endpoint, { params }).then((res) => res.data),

  // Get with pagination metadata (reusable for any endpoint)
  getPaginated: <T>(endpoint: string, params?: Record<string, unknown>) => {
    return apiClient.get(endpoint, { params }).then((response) => {
      // Get original response from config (before unwrapping)
      const originalData = (response.config as any).__originalData;
      return originalData as PaginatedResponse<T>;
    });
  },

  post: <T>(endpoint: string, data?: unknown) =>
    apiClient.post<T>(endpoint, data).then((res) => res.data),

  put: <T>(endpoint: string, data?: unknown) =>
    apiClient.put<T>(endpoint, data).then((res) => res.data),

  patch: <T>(endpoint: string, data?: unknown) =>
    apiClient.patch<T>(endpoint, data).then((res) => res.data),

  delete: <T>(endpoint: string) =>
    apiClient.delete<T>(endpoint).then((res) => res.data),
};

