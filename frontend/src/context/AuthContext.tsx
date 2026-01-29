import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { message } from 'antd';
import { authApi } from '../api/auth.api';
import { storage } from '../utils/storage';
import { AuthContextType, LoginRequest, RegisterRequest } from '../types/auth.types';
import { User } from '../types/user.types';
import { MESSAGES, ROUTES } from '../utils/constants';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(storage.getToken());
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = storage.getToken();
      if (savedToken) {
        try {
          const response = await authApi.me();
          setUser(response.user);
          setToken(savedToken);
        } catch (error) {
          storage.removeToken();
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await authApi.login(credentials);
      storage.setToken(response.token);
      setToken(response.token);
      setUser(response.user);
      message.success(MESSAGES.LOGIN_SUCCESS);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      message.error(MESSAGES.LOGIN_ERROR);
      throw error;
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      const response = await authApi.register(data);
      storage.setToken(response.token);
      setToken(response.token);
      setUser(response.user);
      message.success(MESSAGES.REGISTER_SUCCESS);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      message.error(MESSAGES.REGISTER_ERROR);
      throw error;
    }
  };

  const logout = () => {
    authApi.logout().catch(() => {
      // Ignore errors on logout
    });
    storage.removeToken();
    setToken(null);
    setUser(null);
    message.success(MESSAGES.LOGOUT_SUCCESS);
    navigate(ROUTES.LOGIN);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
