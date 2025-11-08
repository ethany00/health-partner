# 💪 Health Partner (헬스파트너 매칭)

> 나에게 맞는 운동 파트너를 찾고, 실시간으로 소통하세요!

## 📋 프로젝트 소개

헬스파트너 매칭앱은 운동 목표와 스타일이 비슷한 사람들을 연결해주는 웹 애플리케이션입니다.
함께 운동할 파트너를 찾고, 실시간 채팅으로 소통하며, 서로 동기부여를 주고받을 수 있습니다.

### ✨ 주요 기능

- 🔍 **스마트 매칭**: 운동 목표, 선호 시간, 지역 기반 파트너 추천
- 💬 **실시간 채팅**: Socket.io 기반 즉각적인 메시지 교환
- 👤 **프로필 관리**: 운동 경력, 관심사, 목표 설정
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기 지원
- 🔔 **알림 기능**: 새로운 매칭, 메시지 도착 알림

## 🛠 기술 스택

### Frontend
- **React** 18.x + **TypeScript**
- **Tailwind CSS** - 스타일링
- **Zustand** - 상태 관리
- **Socket.io-client** - 실시간 통신
- **React Router** - 라우팅

### Backend
- **NestJS** - Node.js 프레임워크
- **Socket.io** - 실시간 통신
- **PostgreSQL** - 메인 데이터베이스
- **Redis** - 캐싱 및 세션 관리
- **Prisma** - ORM
- **JWT** - 인증/인가

### DevOps & Tools
- **Docker** - 컨테이너화
- **GitHub Actions** - CI/CD
- **ESLint** + **Prettier** - 코드 품질

## 📁 프로젝트 구조

```
health-partner-app/
├── frontend/                # React 프론트엔드
│   ├── src/
│   │   ├── components/     # 재사용 가능한 컴포넌트
│   │   ├── pages/          # 페이지 컴포넌트
│   │   ├── hooks/          # 커스텀 훅
│   │   ├── store/          # Zustand 스토어
│   │   ├── services/       # API 서비스
│   │   └── utils/          # 유틸리티 함수
│   └── package.json
│
├── backend/                 # NestJS 백엔드
│   ├── src/
│   │   ├── auth/           # 인증 모듈
│   │   ├── users/          # 사용자 모듈
│   │   ├── matching/       # 매칭 모듈
│   │   ├── chat/           # 채팅 모듈
│   │   └── common/         # 공통 모듈
│   └── package.json
│
├── docker-compose.yml       # Docker 설정
└── README.md
```

## 🚀 시작하기

### 사전 요구사항

- Node.js 18.x 이상
- npm 또는 yarn
- PostgreSQL 14.x 이상
- Redis 7.x 이상

### 설치 및 실행

#### 1. 레포지토리 클론

```bash
git clone https://github.com/your-username/health-partner-app.git
cd health-partner-app
```

#### 2. 환경 변수 설정

**Backend (.env)**
```bash
cd backend
cp .env.example .env
# .env 파일을 열어 필요한 값들을 설정하세요
```

**Frontend (.env)**
```bash
cd frontend
cp .env.example .env
# .env 파일을 열어 필요한 값들을 설정하세요
```

#### 3. 의존성 설치 및 실행

**Backend**
```bash
cd backend
npm install
npm run start:dev
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

#### 4. Docker로 실행 (선택사항)

```bash
docker-compose up -d
```

### 접속

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- API 문서: http://localhost:4000/api/docs

## 📱 주요 화면

- **홈**: 서비스 소개 및 시작하기
- **회원가입/로그인**: 사용자 인증
- **프로필 설정**: 개인 정보 및 운동 선호도 입력
- **매칭 목록**: 추천된 파트너 목록
- **채팅**: 실시간 메시지 교환
- **마이페이지**: 프로필 수정, 매칭 히스토리

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 👥 팀

- **ethany00** - [@ethany00](https://github.com/ethany00)

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.

---

⭐️ 이 프로젝트가 마음에 드셨다면 Star를 눌러주세요!