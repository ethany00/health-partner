import { api } from './api';
import type { User } from '../types';

export const authService = {
    login: async (email: string, password: string) => {
        const response = await api.post<{ user: User; token: string }>('/auth/login', {
            email,
            password,
        });
        return response.data;
    },

    register: async (data: { email: string; password: string; name: string }) => {
        const response = await api.post<{ user: User; token: string }>('/auth/register', data);
        return response.data;
    },

    getProfile: async () => {
        const response = await api.get<User>('/auth/profile');
        return response.data;
    },
};