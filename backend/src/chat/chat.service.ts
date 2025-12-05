import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(private readonly prisma: PrismaService) { }

    // 내가 참여한 채팅방 목록 조회
    async getMyChatRooms(userId: number) {
        const userChatRooms = await this.prisma.userChatRoom.findMany({
            where: { userId },
            include: {
                chatRoom: {
                    include: {
                        users: {
                            where: { userId: { not: userId } },
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        name: true,
                                        profileImage: true,
                                    },
                                },
                            },
                        },
                        messages: {
                            orderBy: { createdAt: 'desc' },
                            take: 1,
                        },
                    },
                },
            },
        });

        return userChatRooms.map((ucr: (typeof userChatRooms)[number]) => ({
            id: ucr.chatRoom.id,
            partner: ucr.chatRoom.users[0]?.user,
            lastMessage: ucr.chatRoom.messages[0],
            updatedAt: ucr.chatRoom.updatedAt,
        }));
    }

    // 채팅방 메시지 목록 조회
    async getChatRoomMessages(roomId: number, userId: number) {
        // 사용자가 이 방의 멤버인지 확인
        const isMember = await this.prisma.userChatRoom.findUnique({
            where: {
                userId_chatRoomId: {
                    userId,
                    chatRoomId: roomId,
                },
            },
        });

        if (!isMember) {
            throw new Error('접근 권한이 없습니다.');
        }

        return this.prisma.message.findMany({
            where: { chatRoomId: roomId },
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        profileImage: true,
                    },
                },
            },
            orderBy: { createdAt: 'asc' },
        });
    }

    // 메시지 저장
    async saveMessage(chatRoomId: number, senderId: number, content: string) {
        return this.prisma.message.create({
            data: {
                chatRoomId,
                senderId,
                content,
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        name: true,
                        profileImage: true,
                    },
                },
            },
        });
    }
}
