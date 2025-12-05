# 💪 Health Partner (헬스파트너 매칭)

> 나에게 맞는 운동 파트너를 찾고, 실시간으로 소통하세요!

## 📋 프로젝트 소개

헬스파트너 매칭앱은 운동 목표와 스타일이 비슷한 사람들을 연결해주는 웹 애플리케이션입니다.
함께 운동할 파트너를 찾고, 실시간 채팅으로 소통하며, 서로 동기부여를 주고받을 수 있습니다.

### ✨ 주요 기능

- � **회원가입/로그인**: JWT 기반 안전한 인증 시스템
- 👤 **프로필 관리**: 운동 경력(헬린이/중급자/고수/전문가), 지역, 자기소개 설정
- 🔍 **스마트 매칭 시스템**:
  - **추천 파트너**: 나와 아직 매칭되지 않은 사용자 목록
  - **받은 요청**: 나에게 온 매칭 요청 수락/거절
  - **보낸 요청**: 내가 보낸 요청 상태 확인 (대기중/수락됨/거절됨)
- 💬 **실시간 채팅**: WebSocket(Socket.io) 기반 즉각적인 메시지 교환
- � **모바일 최적화**: 480px 중심의 모바일 퍼스트 디자인
- 🎨 **현대적인 UI**: Tailwind CSS 기반 깔끔한 인터페이스

## 🛠 기술 스택

### Frontend
- **React** 19.x + **TypeScript** - 최신 리액트
- **Vite** 6.x - 초고속 빌드 툴
- **Tailwind CSS** 4.x - 유틸리티 퍼스트 스타일링
- **Zustand** - 가볍고 강력한 상태 관리
- **Socket.io-client** - 실시간 통신
- **React Router** - 라우팅
- **Axios** - HTTP 클라이언트

### Backend
- **NestJS** 11.x - 확장 가능한 Node.js 프레임워크
- **Prisma** 5.x - 차세대 ORM (Type-safe)
- **Socket.io** - 실시간 양방향 통신
- **PostgreSQL** - 신뢰할 수 있는 관계형 DB
- **Passport/JWT** - 안전한 인증 시스템
- **bcrypt** - 비밀번호 암호화

### DevOps & Tools
- **Docker** - 컨테이너화 된 개발 환경 (PostgreSQL)
- **ESLint** + **Prettier** - 클린 코드 유지

## 📁 프로젝트 구조

```
health-partner/
├── frontend/                # React + Vite 프론트엔드
│   ├── src/
│   │   ├── components/     # UI 컴포넌트
│   │   │   ├── common/     # Header, BottomNavigation
│   │   │   └── layout/     # MobileLayout
│   │   ├── pages/          # 페이지 컴포넌트
│   │   │   ├── auth/       # Login, Register
│   │   │   ├── matching/   # Matching (3탭 구조)
│   │   │   ├── chat/       # Chat, ChatRoom
│   │   │   └── profile/    # Profile
│   │   ├── store/          # Zustand 전역 상태 (authStore)
│   │   ├── services/       # API 통신 (authService, userService, matchingService, chatService)
│   │   └── types/          # TypeScript 타입 정의
│   └── package.json
│
├── backend/                 # NestJS 백엔드 API
│   ├── src/
│   │   ├── auth/           # 인증 (JWT Strategy, Login/Register)
│   │   ├── users/          # 사용자 정보 관리 (GET /users/me)
│   │   ├── matching/       # 파트너 매칭 로직
│   │   │   ├── matching.service.ts    # 후보 추천, 요청/응답 처리
│   │   │   └── matching.controller.ts # REST API
│   │   ├── chat/           # 실시간 채팅
│   │   │   ├── chat.gateway.ts        # WebSocket Gateway
│   │   │   ├── chat.service.ts        # 채팅방/메시지 관리
│   │   │   └── chat.controller.ts     # REST API
│   │   └── common/         # 공통 모듈
│   │       ├── prisma/     # Prisma Service (Global)
│   │       └── guards/     # JwtAuthGuard
│   ├── prisma/
│   │   ├── schema.prisma   # DB 스키마 (User, Matching, ChatRoom, Message 등)
│   │   └── seed.ts         # 초기 데이터 (Alice, Bob, Charlie)
│   └── package.json
│
└── README.md
```

## �️ 데이터베이스 스키마

### 주요 모델

- **User**: 사용자 정보 (이메일, 비밀번호, 이름, 성별, 나이, 지역, 운동경력, 자기소개)
- **Matching**: 매칭 요청 (요청자, 수신자, 상태: PENDING/ACCEPTED/REJECTED)
- **ChatRoom**: 채팅방
- **UserChatRoom**: 사용자-채팅방 연결 (다대다)
- **Message**: 채팅 메시지

## �🚀 시작하기

### 사전 요구사항

- Node.js 20.x 이상 권장
- npm 또는 pnpm
- Docker (PostgreSQL 실행용)

### 설치 및 실행

#### 1. 레포지토리 클론

```bash
git clone https://github.com/ethany00/health-partner.git
cd health-partner
```

#### 2. PostgreSQL 실행 (Docker)

```bash
cd backend
docker-compose up -d
```

#### 3. Backend 설정 및 실행

```bash
cd backend
npm install

# .env 파일 생성 (예시)
echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/health_partner"' > .env
echo 'JWT_SECRET="your-secret-key-here"' >> .env

# Prisma Client 생성 및 DB 마이그레이션
npx prisma generate
npx prisma db push

# 초기 데이터 삽입 (Alice, Bob, Charlie 생성)
npx prisma db seed

# 서버 실행 (Port: 4000)
npm run start:dev
```

#### 4. Frontend 실행

```bash
cd frontend
npm install

# 개발 서버 실행 (Port: 5173)
npm run dev
```

### 접속 및 테스트

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000/api

**테스트 계정:**
- Email: `alice@example.com` / Password: `password123`
- Email: `bob@example.com` / Password: `password123`
- Email: `charlie@example.com` / Password: `password123`

## 📱 주요 화면 및 기능

### 1. 인증
- **회원가입**: 이메일, 비밀번호, 이름 입력
- **로그인**: JWT 토큰 발급 및 저장

### 2. 프로필
- 사용자 정보 표시 (이름, 이메일, 지역, 운동 경력)
- 로그아웃 기능

### 3. 매칭 (3탭 구조)
- **추천 파트너**: 매칭 가능한 사용자 목록, "같이 운동하기" 요청
- **받은 요청**: 나에게 온 요청 수락/거절
- **보낸 요청**: 내가 보낸 요청 상태 확인 (수락 시 "채팅하러 가기" 버튼)

### 4. 채팅
- **채팅방 목록**: 매칭 수락 시 자동 생성된 채팅방 목록
- **실시간 채팅**: WebSocket 기반 즉시 메시지 전송/수신

## 🎯 API 엔드포인트

### Auth
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인

### Users
- `GET /api/users/me` - 내 프로필 조회 (인증 필요)

### Matching
- `GET /api/matching/candidates` - 추천 파트너 목록
- `POST /api/matching/request` - 매칭 요청 보내기
- `GET /api/matching/requests` - 받은 요청 목록
- `GET /api/matching/sent` - 보낸 요청 목록
- `POST /api/matching/respond/:id` - 요청 수락/거절

### Chat
- `GET /api/chat/rooms` - 내 채팅방 목록
- `GET /api/chat/rooms/:id/messages` - 채팅방 메시지 조회

### WebSocket Events
- `joinRoom` - 채팅방 입장
- `sendMessage` - 메시지 전송
- `newMessage` - 새 메시지 수신 (브로드캐스트)

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

This project is licensed under the MIT License

## 👥 팀

- **ethany00** - [@ethany00](https://github.com/ethany00)

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.

---

⭐️ 이 프로젝트가 마음에 드셨다면 Star를 눌러주세요!