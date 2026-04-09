import { AxiosResponse } from 'axios';

export function handleResponse<T>(res: AxiosResponse): T {
  return (res.data?.data ?? res.data) as T;
}

export function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const err = error as { response?: { data?: { message?: string } } };
    return err.response?.data?.message || 'Unknown error';
  }
  return 'Unknown error';
}