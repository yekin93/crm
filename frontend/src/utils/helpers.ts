import dayjs from 'dayjs';
import { DATE_FORMAT, DATETIME_FORMAT } from './constants';

export const formatDate = (date: string | Date, format = DATE_FORMAT): string => {
  return dayjs(date).format(format);
};

export const formatDateTime = (date: string | Date): string => {
  return dayjs(date).format(DATETIME_FORMAT);
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

export const debounce = <T extends (...args: string[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getUserRoleLabel = (role: string): string => {
  const roleLabels: Record<string, string> = {
    ADMIN: 'Yönetici',
    USER: 'Kullanıcı',
    MANAGER: 'Müdür',
  };
  return roleLabels[role] || role;
};

export const getUserStatusLabel = (status: string): string => {
  const statusLabels: Record<string, string> = {
    ACTIVE: 'Aktif',
    INACTIVE: 'Pasif',
    PENDING: 'Beklemede',
  };
  return statusLabels[status] || status;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Bir hata oluştu.';
};
