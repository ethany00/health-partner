import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { MatchingStatus } from '@prisma/client';

@Injectable()
export class MatchingService {
    constructor(private readonly prisma: PrismaService) { }

    // 매칭 후보 추천 (나와 이미 매칭 관계가 없는 사람들)
    async findCandidates(userId: number) {
        console.log(`[Matching] Finding candidates for user ${userId}`);

        // 1. 내가 보냈거나 받은 매칭 요청의 상대방 ID 목록 조회
        const myMatches = await this.prisma.matching.findMany({
            where: {
                OR: [{ requesterId: userId }, { receiverId: userId }],
            },
        });

        const excludeUserIds = myMatches.map((m) =>
            m.requesterId === userId ? m.receiverId : m.requesterId,
        );
        excludeUserIds.push(userId); // 나 자신도 제외

        console.log(`[Matching] Exclude IDs: ${excludeUserIds.join(', ')}`);

        // 2. 제외할 ID가 아닌 사용자들 조회
        const candidates = await this.prisma.user.findMany({
            where: {
                id: { notIn: excludeUserIds },
            },
            select: {
                id: true,
                name: true,
                email: true,
                gender: true,
                age: true,
                region: true,
                career: true,
                bio: true,
                profileImage: true,
            },
        });

        console.log(`[Matching] Found ${candidates.length} candidates`);
        return candidates;
    }

    // 매칭 요청 보내기
    async requestMatching(requesterId: number, receiverId: number) {
        if (requesterId === receiverId) {
            throw new ConflictException('자기 자신에게 요청할 수 없습니다.');
        }

        const receiver = await this.prisma.user.findUnique({
            where: { id: receiverId },
        });
        if (!receiver) {
            throw new NotFoundException('사용자를 찾을 수 없습니다.');
        }

        // 이미 요청이 존재하는지 확인
        const existingMatch = await this.prisma.matching.findFirst({
            where: {
                OR: [
                    { requesterId, receiverId },
                    { requesterId: receiverId, receiverId: requesterId },
                ],
            },
        });

        if (existingMatch) {
            throw new ConflictException('이미 매칭 요청이 존재하거나 완료된 상태입니다.');
        }

        return this.prisma.matching.create({
            data: {
                requesterId,
                receiverId,
                status: MatchingStatus.PENDING,
            },
        });
    }

    // 나에게 온 매칭 요청 목록 조회
    async getReceivedRequests(userId: number) {
        return this.prisma.matching.findMany({
            where: {
                receiverId: userId,
                status: MatchingStatus.PENDING,
            },
            include: {
                requester: {
                    select: {
                        id: true,
                        name: true,
                        gender: true,
                        age: true,
                        region: true,
                        career: true,
                        profileImage: true,
                        bio: true,
                    },
                },
            },
        });
    }

    // 내가 보낸 요청 목록 조회
    async getSentRequests(userId: number) {
        return this.prisma.matching.findMany({
            where: { requesterId: userId },
            include: {
                receiver: {
                    select: {
                        id: true,
                        name: true,
                        gender: true,
                        age: true,
                        region: true,
                        career: true,
                        profileImage: true,
                        bio: true,
                    },
                },
            },
        });
    }

    // 매칭 요청 수락/거절
    async respondMatching(userId: number, matchId: number, action: 'accept' | 'reject') {
        const match = await this.prisma.matching.findUnique({
            where: { id: matchId },
        });

        if (!match) {
            throw new NotFoundException('요청을 찾을 수 없습니다.');
        } // 사용자 본인이 받은 요청인지 확인
        if (match.receiverId !== userId) {
            throw new ConflictException('권한이 없습니다.');
        }
        if (match.status !== MatchingStatus.PENDING) {
            throw new ConflictException('이미 처리된 요청입니다.');
        }

        const newStatus = action === 'accept' ? MatchingStatus.ACCEPTED : MatchingStatus.REJECTED;

        // 트랜잭션으로 처리 (수락 시 채팅방 생성)
        return this.prisma.$transaction(async (tx) => {
            // 1. 매칭 상태 업데이트
            const updatedMatch = await tx.matching.update({
                where: { id: matchId },
                data: { status: newStatus },
            });

            // 2. 수락인 경우 채팅방 생성 및 멤버 추가
            if (action === 'accept') {
                const chatRoom = await tx.chatRoom.create({
                    data: {
                        users: {
                            create: [
                                { userId: match.requesterId },
                                { userId: match.receiverId },
                            ],
                        },
                    },
                });
                console.log(`[Matching] ChatRoom created: ${chatRoom.id} for users ${match.requesterId}, ${match.receiverId}`);
            }

            return updatedMatch;
        });
    }
}
