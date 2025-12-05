import { api } from './api';
import type { User } from '../types';

export const userService = {
    getProfile: async (): Promise<User> => {
        const response = await api.get<User>('/users/me');
        return response.data;
    },
};
