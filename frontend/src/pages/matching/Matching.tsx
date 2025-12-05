import { useState, useEffect } from 'react';
import type {User} from '../../types';

export default function Matching() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchMatchCandidates();
    }, []);

    const fetchMatchCandidates = async () => {
        try {
            setLoading(true);
            // TODO: 실제 API 연결
            // const response = await api.get('/matching/candidates');
            // setUsers(response.data);

            // 임시 더미 데이터
            setUsers([
                {
                    id: '1',
                    name: '김철수',
                    email: 'kim@example.com',
                    age: 28,
                    gender: 'male',
                    bio: '헬스 3년차입니다. 같이 운동하실 분 찾아요!',
                    fitnessGoals: ['근력 강화', '체중 감량'],
                    preferredWorkoutTime: '저녁',
                    location: '서울 강남',
                    createdAt: new Date().toISOString(),
                },
                {
                    id: '2',
                    name: '이영희',
                    email: 'lee@example.com',
                    age: 25,
                    gender: 'female',
                    bio: '운동 초보입니다. 함께 배워가요!',
                    fitnessGoals: ['체력 향상', '다이어트'],
                    preferredWorkoutTime: '아침',
                    location: '서울 서초',
                    createdAt: new Date().toISOString(),
                },
            ]);
        } catch (error) {
            console.error('매칭 후보 조회 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async () => {
        if (currentIndex >= users.length) return;

        try {
            // TODO: 실제 API 연결
            // await api.post('/matching/like', { targetUserId: users[currentIndex].id });
            console.log('좋아요:', users[currentIndex].name);
            setCurrentIndex(currentIndex + 1);
        } catch (error) {
            console.error('좋아요 실패:', error);
        }
    };

    const handlePass = () => {
        setCurrentIndex(currentIndex + 1);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <div className="text-xl text-gray-600">로딩 중...</div>
            </div>
        );
    }

    if (currentIndex >= users.length) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">더 이상 매칭 후보가 없습니다</h2>
                    <button
                        onClick={() => {
                            setCurrentIndex(0);
                            fetchMatchCandidates();
                        }}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                    >
                        다시 보기
                    </button>
                </div>
            </div>
        );
    }

    const currentUser = users[currentIndex];

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">운동 파트너 찾기</h1>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* 프로필 이미지 영역 */}
                    <div className="h-96 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <div className="text-white text-9xl">
                            {currentUser.gender === 'male' ? '👨' : '👩'}
                        </div>
                    </div>

                    {/* 프로필 정보 */}
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-bold">{currentUser.name}</h2>
                            <span className="text-xl text-gray-600">{currentUser.age}세</span>
                        </div>

                        <p className="text-gray-700 mb-4">{currentUser.bio}</p>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center text-gray-600">
                                <span className="font-semibold mr-2">📍 위치:</span>
                                {currentUser.location}
                            </div>
                            <div className="flex items-center text-gray-600">
                                <span className="font-semibold mr-2">⏰ 선호 시간:</span>
                                {currentUser.preferredWorkoutTime}
                            </div>
                            <div>
                                <span className="font-semibold text-gray-600 mr-2">🎯 운동 목표:</span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {currentUser.fitnessGoals?.map((goal, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                        >
                      {goal}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 액션 버튼 */}
                        <div className="flex gap-4">
                            <button
                                onClick={handlePass}
                                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition text-lg"
                            >
                                ❌ 패스
                            </button>
                            <button
                                onClick={handleLike}
                                className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition text-lg"
                            >
                                💙 좋아요
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-4 text-gray-600">
                    {currentIndex + 1} / {users.length}
                </div>
            </div>
        </div>
    );
}