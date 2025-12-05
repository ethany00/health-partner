import { PrismaClient, Gender, Career, MatchingStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Reset database (optional: use caution in production)
    // await prisma.message.deleteMany();
    // await prisma.userChatRoom.deleteMany();
    // await prisma.chatRoom.deleteMany();
    // await prisma.matching.deleteMany();
    // await prisma.user.deleteMany();

    const saltRounds = 10;
    const password = await bcrypt.hash('password123', saltRounds);

    // 1. Create Users
    const alice = await prisma.user.upsert({
        where: { email: 'alice@example.com' },
        update: {},
        create: {
            email: 'alice@example.com',
            password,
            name: 'Alice Kim',
            gender: Gender.FEMALE,
            age: 25,
            region: '서울 강남구',
            career: Career.BEGINNER,
            bio: '이제 막 운동 시작한 헬린이입니다! 같이 하실 분 구해요.',
        },
    });

    const bob = await prisma.user.upsert({
        where: { email: 'bob@example.com' },
        update: {},
        create: {
            email: 'bob@example.com',
            password,
            name: 'Bob Lee',
            gender: Gender.MALE,
            age: 30,
            region: '서울 서초구',
            career: Career.ADVANCED,
            bio: '3대 500 칩니다. 성실하게 하실 분만.',
        },
    });

    const charlie = await prisma.user.upsert({
        where: { email: 'charlie@example.com' },
        update: {},
        create: {
            email: 'charlie@example.com',
            password,
            name: 'Charlie Park',
            gender: Gender.MALE,
            age: 28,
            region: '경기 성남시',
            career: Career.INTERMEDIATE,
            bio: '주 3회 꾸준히 운동합니다.',
        },
    });

    console.log('✅ Users created: Alice, Bob, Charlie');

    // 2. Create Matching (Alice -> Bob)
    const existingMatching = await prisma.matching.findFirst({
        where: { requesterId: alice.id, receiverId: bob.id },
    });

    if (!existingMatching) {
        await prisma.matching.create({
            data: {
                requesterId: alice.id,
                receiverId: bob.id,
                status: MatchingStatus.PENDING,
            },
        });
        console.log('✅ Matching created: Alice -> Bob (PENDING)');
    }

    console.log('🚀 Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
