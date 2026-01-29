import axiosInstance from './axios.config';
import { ENDPOINTS } from './endpoints';
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserListResponse,
} from '../types/user.types';
import { ApiResponse, SearchParams } from '../types/common.types';

export const userApi = {
  getUsers: async (params?: SearchParams): Promise<UserListResponse> => {
    const response = await axiosInstance.get<ApiResponse<UserListResponse>>(
      ENDPOINTS.USERS.LIST,
      { params }
    );
    return response.data.data;
  },

  getUser: async (id: number): Promise<User> => {
    const response = await axiosInstance.get<ApiResponse<User>>(
      ENDPOINTS.USERS.GET(id)
    );
    return response.data.data;
  },

  createUser: async (data: CreateUserRequest): Promise<User> => {
    const response = await axiosInstance.post<ApiResponse<User>>(
      ENDPOINTS.USERS.CREATE,
      data
    );
    return response.data.data;
  },

  updateUser: async (id: number, data: UpdateUserRequest): Promise<User> => {
    const response = await axiosInstance.put<ApiResponse<User>>(
      ENDPOINTS.USERS.UPDATE(id),
      data
    );
    return response.data.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await axiosInstance.delete(ENDPOINTS.USERS.DELETE(id));
  },

  getProfile: async (): Promise<User> => {
    const response = await axiosInstance.get<ApiResponse<User>>(
      ENDPOINTS.PROFILE.GET
    );
    return response.data.data;
  },

  updateProfile: async (data: UpdateUserRequest): Promise<User> => {
    const response = await axiosInstance.put<ApiResponse<User>>(
      ENDPOINTS.PROFILE.UPDATE,
      data
    );
    return response.data.data;
  },
};
