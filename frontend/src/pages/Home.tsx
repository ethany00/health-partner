import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Target, MessageCircle, Trophy, ArrowRight, Activity, Users } from 'lucide-react';

export default function Home() {
    const isAuth = useAuthStore((state) => state.isAuthenticated);

    return (
        <div className="min-h-screen bg-slate-50 pt-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1 mb-8 shadow-sm">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            <span className="text-sm font-medium text-blue-800">지금 1,200명의 파트너가 활동 중이에요</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                            혼자 하는 운동은<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">이제 그만하세요</span>
                        </h1>

                        <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                            당신의 목표와 스타일이 딱 맞는 최고의 운동 파트너를 찾아드립니다.<br className="hidden sm:block" />
                            서로 동기부여하며 더 즐겁고 꾸준하게 운동해보세요.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to={isAuth ? "/matching" : "/register"}
                                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
                            >
                                {isAuth ? '매칭 시작하기' : '무료로 시작하기'}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            {!isAuth && (
                                <Link
                                    to="/login"
                                    className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-all"
                                >
                                    기존 계정으로 로그인
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="border-y border-slate-200 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="bg-blue-100 p-3 rounded-full mb-4 text-blue-600">
                                <Users size={32} />
                            </div>
                            <div className="text-4xl font-bold text-slate-900 mb-2">98%</div>
                            <div className="text-slate-500 font-medium">매칭 성공률</div>
                        </div>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="bg-purple-100 p-3 rounded-full mb-4 text-purple-600">
                                <MessageCircle size={32} />
                            </div>
                            <div className="text-4xl font-bold text-slate-900 mb-2">5.000+</div>
                            <div className="text-slate-500 font-medium">일일 대화 건수</div>
                        </div>
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="bg-orange-100 p-3 rounded-full mb-4 text-orange-600">
                                <Activity size={32} />
                            </div>
                            <div className="text-4xl font-bold text-slate-900 mb-2">30일</div>
                            <div className="text-slate-500 font-medium">평균 운동 지속 기간 증가</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase mb-2">Features</h2>
                    <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        완벽한 파트너를 만나는 과정
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 hover:border-blue-100 group">
                        <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Target className="w-7 h-7 text-red-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">스마트 매칭</h3>
                        <p className="text-slate-600 leading-relaxed">
                            운동 목표, 선호 시간대, 스타일 등 12가지 데이터를 분석하여 당신에게 가장 적합한 파트너를 추천합니다.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 hover:border-purple-100 group">
                        <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <MessageCircle className="w-7 h-7 text-purple-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">실시간 채팅</h3>
                        <p className="text-slate-600 leading-relaxed">
                            매칭된 파트너와 즉시 대화를 시작하세요. 약속 잡기부터 운동 팁 공유까지 끊김 없이 소통할 수 있습니다.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 hover:border-yellow-100 group">
                        <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Trophy className="w-7 h-7 text-yellow-500" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">함께 성장</h3>
                        <p className="text-slate-600 leading-relaxed">
                            서로의 운동 목표 달성을 응원하고 기록을 공유하며 혼자일 때보다 더 멀리, 더 오래 나아갈 수 있습니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer (Simple) */}
            <footer className="bg-slate-50 border-t border-slate-200 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center text-slate-500">
                    <p>&copy; 2025 Health Partner. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}