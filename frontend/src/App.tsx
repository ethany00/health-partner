import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { Header } from './components/common/header';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Matching from './pages/matching/Matching';
import Chat from './pages/chat/Chat';
import ChatRoom from './pages/chat/ChatRoom';
import Profile from './pages/profile/Profile';
import { MobileLayout } from './components/layout/MobileLayout';
import { BottomNavigation } from './components/common/BottomNavigation';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

const AppContent = () => {
    const { isAuthenticated } = useAuthStore();

    return (
        <MobileLayout>
            <Header />
            <main className="flex-1 w-full overflow-y-auto bg-slate-50 relative pb-4 scrollbar-hide">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/matching"
                        element={
                            <ProtectedRoute>
                                <Matching />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/chat"
                        element={
                            <ProtectedRoute>
                                <Chat />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/chat/:roomId"
                        element={
                            <ProtectedRoute>
                                <ChatRoom />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
            {isAuthenticated && <BottomNavigation />}
        </MobileLayout>
    );
};

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;