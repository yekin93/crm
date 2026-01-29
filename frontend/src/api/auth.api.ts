import axiosInstance from './axios.config';
import { ENDPOINTS } from './endpoints';
import { LoginRequest, RegisterRequest, AuthResponse, ChangePasswordRequest } from '../types/auth.types';
import { ApiResponse } from '../types/common.types';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
      ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
      ENDPOINTS.AUTH.REGISTER,
      data
    );
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post(ENDPOINTS.AUTH.LOGOUT);
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>(
      ENDPOINTS.AUTH.REFRESH
    );
    return response.data.data;
  },

  me: async (): Promise<AuthResponse> => {
    const response = await axiosInstance.get<ApiResponse<AuthResponse>>(
      ENDPOINTS.AUTH.ME
    );
    return response.data.data;
  },

  changePassword: async (data: ChangePasswordRequest): Promise<void> => {
    await axiosInstance.post(ENDPOINTS.PROFILE.CHANGE_PASSWORD, data);
  },
};
