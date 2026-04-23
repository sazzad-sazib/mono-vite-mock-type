import axiosInstance from '@/lib/axios';
import { userService } from '@/services/user.service';
import { useMemo } from 'react';

/**
 * Hook that returns a fully-typed API client.
 *
 * Usage:
 *   const apiClient = useAPIClient();
 *   const user = await apiClient.getUser('123');
 */
export const useAPIClient = () => {
  return useMemo(
    () => ({
      user: userService(axiosInstance),
      // add more services here as you grow:
      // ...productService(axiosInstance),
      // ...authService(axiosInstance),
    }),
    [],
  );
};
