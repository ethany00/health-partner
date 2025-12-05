import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { userService } from '../../services/userService';
import type { User } from '../../types';
import { Settings, Bell, HelpCircle, LogOut, ChevronRight, User as UserIcon, Activity, Trophy, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { user: storedUser, logout, setAuth } = useAuthStore();
    const [user, setUser] = useState<User | null>(storedUser);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await userService.getProfile();
                setUser(data);
                // 스토어 정보도 최신화 (토큰은 그대로)
                const token = localStorage.getItem('token');
                if (token) setAuth(data, token);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [setAuth]);

    const handleLogout = () => {
        if (window.confirm('정말 로그아웃 하시겠습니까?')) {
            logout();
            navigate('/login');
        }
    };

    const menuItems = [
        { icon: Settings, label: '내 정보 수정', onClick: () => alert('준비 중입니다.') },
        { icon: Bell, label: '알림 설정', onClick: () => alert('준비 중입니다.') },
        { icon: HelpCircle, label: '고객센터', onClick: () => alert('준비 중입니다.') },
    ];

    if (loading) return <div className="flex justify-center items-center h-full min-h-[500px]">로딩 중...</div>;

    return (
        <div className="pb-10">
            {/* Header Profile Section */}
            <div className="relative bg-white pt-6 pb-8 px-6 text-center shadow-sm border-b border-slate-100">
                <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg mb-4 ring-4 ring-blue-50">
                    <UserIcon size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{user?.name || '사용자'}</h2>
                <p className="text-slate-500 text-sm mt-1">{user?.email}</p>

                <div className="mt-6 flex justify-center gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold">
                        초급 헬린이
                    </span>
                    <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold">
                        서울 강남구
                    </span>
                </div>
            </div>

            {/* Stats Section */}
            <div className="px-5 mt-6 mb-8">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex justify-between items-center text-center divide-x divide-slate-100">
                    <div className="flex-1">
                        <div className="flex justify-center mb-2 text-blue-500"><Activity size={20} /></div>
                        <div className="text-lg font-bold text-slate-800">12</div>
                        <div className="text-xs text-slate-400">이번달 운동</div>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-center mb-2 text-yellow-500"><Trophy size={20} /></div>
                        <div className="text-lg font-bold text-slate-800">5</div>
                        <div className="text-xs text-slate-400">매칭 성공</div>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-center mb-2 text-green-500"><Calendar size={20} /></div>
                        <div className="text-lg font-bold text-slate-800">28일</div>
                        <div className="text-xs text-slate-400">연속 출석</div>
                    </div>
                </div>
            </div>

            {/* Menu List */}
            <div className="px-5 space-y-3">
                {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={index}
                            onClick={item.onClick}
                            className="w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center gap-3 text-slate-700 font-medium">
                                <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                                    <Icon size={18} />
                                </div>
                                {item.label}
                            </div>
                            <ChevronRight size={18} className="text-slate-400" />
                        </button>
                    )
                })}

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full mt-6 p-4 rounded-xl flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 transition-colors font-medium text-sm"
                >
                    <LogOut size={18} />
                    로그아웃
                </button>
            </div>

            <div className="text-center mt-8 text-xs text-slate-300">
                Health Partner v1.0.0
            </div>
        </div>
    );
}