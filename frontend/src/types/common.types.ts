export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams extends PaginationParams {
  search?: string;
  filter?: Record<string, unknown>;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  loadingState: LoadingState;
}
