import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function Profile() {
    const { user } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        age: user?.age || '',
        bio: user?.bio || '',
        location: user?.location || '',
        preferredWorkoutTime: user?.preferredWorkoutTime || '',
        fitnessGoals: user?.fitnessGoals || [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: API 연결
        console.log('프로필 업데이트:', formData);
        setIsEditing(false);
    };

    // const fitnessGoalOptions = [
    //     '체중 감량',
    //     '근력 강화',
    //     '체력 향상',
    //     '유연성 개선',
    //     '건강 유지',
    // ];

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* 프로필 헤더 */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>

                    <div className="relative px-8 pb-8">
                        {/* 프로필 이미지 */}
                        <div className="absolute -top-16 left-8">
                            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-6xl border-4 border-white shadow-lg">
                                {user?.gender === 'male' ? '👨' : user?.gender === 'female' ? '👩' : '👤'}
                            </div>
                        </div>

                        <div className="pt-20">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
                                    <p className="text-gray-600">{user?.email}</p>
                                </div>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    {isEditing ? '취소' : '프로필 수정'}
                                </button>
                            </div>

                            {isEditing ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            이름
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            나이
                                        </label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            자기소개
                                        </label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            위치
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            선호 운동 시간
                                        </label>
                                        <select
                                            name="preferredWorkoutTime"
                                            value={formData.preferredWorkoutTime}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">선택하세요</option>
                                            <option value="아침">아침</option>
                                            <option value="점심">점심</option>
                                            <option value="저녁">저녁</option>
                                            <option value="심야">심야</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                                    >
                                        저장하기
                                    </button>
                                </form>
                            ) : (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 mb-2">자기소개</h3>
                                        <p className="text-gray-800">{user?.bio || '자기소개가 없습니다.'}</p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 mb-2">정보</h3>
                                        <div className="space-y-2">
                                            <p className="text-gray-800">📍 {user?.location || '미설정'}</p>
                                            <p className="text-gray-800">⏰ {user?.preferredWorkoutTime || '미설정'}</p>
                                            <p className="text-gray-800">🎂 {user?.age ? `${user.age}세` : '미설정'}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-500 mb-2">운동 목표</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {user?.fitnessGoals && user.fitnessGoals.length > 0 ? (
                                                user.fitnessGoals.map((goal, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                                    >
                            {goal}
                          </span>
                                                ))
                                            ) : (
                                                <p className="text-gray-500">설정된 목표가 없습니다.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}