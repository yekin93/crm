import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL, MESSAGES } from '../utils/constants';
import { storage } from '../utils/storage';
import { ApiError, ApiResponse } from '../types/common.types';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      const { status } = error.response;

      // Handle 401 Unauthorized
      if (status === 401) {
        storage.removeToken();
        window.location.href = '/login';
        return Promise.reject({
          message: MESSAGES.UNAUTHORIZED,
          code: 'UNAUTHORIZED',
        });
      }

      // Handle 403 Forbidden
      if (status === 403) {
        return Promise.reject({
          message: 'Bu işlem için yetkiniz yok.',
          code: 'FORBIDDEN',
        });
      }

      // Handle 404 Not Found
      if (status === 404) {
        return Promise.reject({
          message: 'İstenen kaynak bulunamadı.',
          code: 'NOT_FOUND',
        });
      }

      // Handle 500 Internal Server Error
      if (status === 500) {
        return Promise.reject({
          message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
          code: 'INTERNAL_SERVER_ERROR',
        });
      }

      // Handle other errors
      return Promise.reject(
        error.response.data || {
          message: 'Bir hata oluştu.',
          code: 'UNKNOWN_ERROR',
        }
      );
    }

    // Network error
    if (error.request) {
      return Promise.reject({
        message: MESSAGES.NETWORK_ERROR,
        code: 'NETWORK_ERROR',
      });
    }

    // Other errors
    return Promise.reject({
      message: error.message || 'Bir hata oluştu.',
      code: 'UNKNOWN_ERROR',
    });
  }
);

export default axiosInstance;
