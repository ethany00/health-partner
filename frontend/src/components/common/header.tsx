import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Dumbbell, LogOut, ChevronLeft } from 'lucide-react';

export const Header = () => {
    const { isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isHome = location.pathname === '/';

    // 페이지 제목 매핑
    const getPageTitle = (path: string) => {
        if (path === '/login') return '로그인';
        if (path === '/register') return '회원가입';
        if (path === '/matching') return '파트너 매칭';
        if (path === '/chat') return '채팅 목록';
        if (path === '/profile') return '내 프로필';
        if (path.startsWith('/chat/')) return '채팅방';
        return '';
    };

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 h-14 flex items-center px-4 shrink-0">
            {isHome ? (
                /* 메인 탭: 로고 표시 */
                <div className="flex justify-between items-center w-full">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                            <Dumbbell size={20} />
                        </div>
                        <span className="text-lg font-bold text-slate-900 tracking-tight">
                            Health Partner
                        </span>
                    </Link>

                    {/* 메인 탭 우측 액션 (로그인 전에는 로그인 버튼, 후에는 로그아웃) */}
                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            >
                                <LogOut size={20} />
                            </button>
                        ) : (
                            <nav className="flex items-center gap-3 text-sm font-medium">
                                <Link to="/login" className="text-slate-600 hover:text-blue-600">
                                    로그인
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 transition-colors"
                                >
                                    시작
                                </Link>
                            </nav>
                        )}
                    </div>
                </div>
            ) : (
                /* 서브 페이지: 뒤로가기 버튼 + 제목 */
                <div className="relative flex items-center justify-center w-full">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute left-0 p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <span className="text-lg font-bold text-slate-900">
                        {getPageTitle(location.pathname)}
                    </span>
                </div>
            )}
        </header>
    );
};