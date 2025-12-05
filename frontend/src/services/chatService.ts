import { api } from './api';

export interface ChatRoom {
    id: number;
    partner: {
        id: number;
        name: string;
        profileImage?: string;
    };
    lastMessage?: {
        content: string;
        createdAt: string;
    };
}

export interface Message {
    id: number;
    content: string;
    senderId: number;
    createdAt: string;
    sender: {
        id: number;
        name: string;
        profileImage?: string;
    };
}

export const chatService = {
    // 채팅방 목록 조회
    getChatRooms: async (): Promise<ChatRoom[]> => {
        const response = await api.get('/chat/rooms');
        return response.data;
    },

    // 채팅방 메시지 조회
    getChatRoomMessages: async (roomId: number): Promise<Message[]> => {
        const response = await api.get(`/chat/rooms/${roomId}/messages`);
        return response.data;
    },
};
