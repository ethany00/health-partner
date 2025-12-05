import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Dumbbell, LogOut, User, MessageCircle, Heart } from 'lucide-react';

export const Header = () => {
    const { isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-blue-600 p-2 rounded-lg text-white group-hover:bg-blue-700 transition-colors">
                            <Dumbbell size={24} />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                            Health Partner
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center gap-6">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/matching"
                                    className="hidden md:flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors"
                                >
                                    <Heart size={20} />
                                    <span>매칭</span>
                                </Link>
                                <Link
                                    to="/chat"
                                    className="hidden md:flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors"
                                >
                                    <MessageCircle size={20} />
                                    <span>채팅</span>
                                </Link>
                                <Link
                                    to="/profile"
                                    className="hidden md:flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors"
                                >
                                    <User size={20} />
                                    <span>프로필</span>
                                </Link>
                                <div className="h-6 w-px bg-slate-200 hidden md:block" />
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-slate-500 hover:text-red-500 font-medium transition-colors"
                                >
                                    <LogOut size={20} />
                                    <span className="hidden md:inline">로그아웃</span>
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/login"
                                    className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
                                >
                                    로그인
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    시작하기
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};