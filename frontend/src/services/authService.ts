import { api } from './api';
import type { RegisterData, LoginData } from '../types';

export const authService = {
    register: async (data: RegisterData) => {
        // 백엔드에서 현재 User 객체만 반환함 (토큰 미포함)
        const response = await api.post('/auth/register', data);
        return response.data;
    },

    login: async (data: LoginData) => {
        const response = await api.post('/auth/login', data);
        return response.data;
    }
};