import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, MessageCircle, User } from 'lucide-react';

export const BottomNavigation = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: '/', icon: Home, label: '홈' },
        { path: '/matching', icon: Heart, label: '매칭' },
        { path: '/chat', icon: MessageCircle, label: '채팅' },
        { path: '/profile', icon: User, label: '프로필' },
    ];

    return (
        <nav className="bg-white border-t border-slate-200 pb-[env(safe-area-inset-bottom)] shrink-0">
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${active ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            <Icon size={24} strokeWidth={active ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};
