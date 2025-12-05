import { api } from './api';
import type { User } from '../types';

export const matchingService = {
    // 매칭 후보 조회
    getCandidates: async (): Promise<User[]> => {
        const response = await api.get<User[]>('/matching/candidates');
        return response.data;
    },

    // 매칭 요청 보내기
    requestMatching: async (receiverId: number): Promise<void> => {
        await api.post('/matching/request', { receiverId });
    },

    // 받은 요청 목록 조회
    getReceivedRequests: async (): Promise<any[]> => {
        const response = await api.get('/matching/requests');
        return response.data;
    },

    // 보낸 요청 목록 조회
    getSentRequests: async (): Promise<any[]> => {
        const response = await api.get('/matching/sent');
        return response.data;
    },

    // 요청 수락/거절
    respondMatching: async (matchId: number, action: 'accept' | 'reject'): Promise<void> => {
        await api.post(`/matching/respond/${matchId}`, { action });
    },
};
