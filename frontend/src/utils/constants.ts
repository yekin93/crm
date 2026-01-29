export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:1905/api';
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'CRM Application';
export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || 'crm_auth_token';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  USER_DETAIL: '/users/:id',
  USER_CREATE: '/users/create',
  USER_EDIT: '/users/:id/edit',
  PROFILE: '/profile',
  NOT_FOUND: '*',
} as const;

export const PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const MESSAGES = {
  LOGIN_SUCCESS: 'Giriş başarılı!',
  LOGIN_ERROR: 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.',
  LOGOUT_SUCCESS: 'Çıkış yapıldı.',
  REGISTER_SUCCESS: 'Kayıt başarılı! Giriş yapabilirsiniz.',
  REGISTER_ERROR: 'Kayıt başarısız.',
  DELETE_CONFIRM: 'Bu işlemi silmek istediğinizden emin misiniz?',
  DELETE_SUCCESS: 'Silme işlemi başarılı.',
  DELETE_ERROR: 'Silme işlemi başarısız.',
  SAVE_SUCCESS: 'Kayıt başarılı.',
  SAVE_ERROR: 'Kayıt başarısız.',
  UPDATE_SUCCESS: 'Güncelleme başarılı.',
  UPDATE_ERROR: 'Güncelleme başarısız.',
  NETWORK_ERROR: 'Ağ hatası. Lütfen internet bağlantınızı kontrol edin.',
  UNAUTHORIZED: 'Oturum süreniz doldu. Lütfen tekrar giriş yapın.',
} as const;
