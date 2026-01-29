import { useState, useCallback } from 'react';
import { UseApiState } from '../types/common.types';
import { getErrorMessage } from '../utils/helpers';

export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
    loadingState: 'idle',
  });

  const execute = useCallback(
    async (apiCall: () => Promise<T>): Promise<T | null> => {
      setState({
        data: null,
        loading: true,
        error: null,
        loadingState: 'loading',
      });

      try {
        const data = await apiCall();
        setState({
          data,
          loading: false,
          error: null,
          loadingState: 'success',
        });
        return data;
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        setState({
          data: null,
          loading: false,
          error: errorMessage,
          loadingState: 'error',
        });
        return null;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      loadingState: 'idle',
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
