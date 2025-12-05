import { useEffect, useState } from 'react';
import { matchingService } from '../../services/matchingService';
import type { User } from '../../types';
import { MapPin, User as UserIcon, Dumbbell, Send, Check, Clock, XCircle, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Tab = 'recommend' | 'received' | 'sent';

interface MatchingRequest {
    id: number;
    requester?: User;
    receiver?: User;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    createdAt: string;
}

export default function Matching() {
    const [activeTab, setActiveTab] = useState<Tab>('recommend');
    const [candidates, setCandidates] = useState<User[]>([]);
    const [requests, setRequests] = useState<MatchingRequest[]>([]); // 받은 요청
    const [sentRequests, setSentRequests] = useState<MatchingRequest[]>([]); // 보낸 요청
    const [loading, setLoading] = useState(true);
    const [requestedIds, setRequestedIds] = useState<number[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (activeTab === 'recommend') {
            fetchCandidates();
        } else if (activeTab === 'received') {
            fetchRequests(); // 받은 요청
        } else {
            fetchSentRequests(); // 보낸 요청
        }
    }, [activeTab]);

    const fetchCandidates = async () => {
        setLoading(true);
        try {
            const data = await matchingService.getCandidates();
            setCandidates(data);
        } catch (error) {
            console.error('Failed to fetch candidates', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const data = await matchingService.getReceivedRequests();
            setRequests(data);
        } catch (error) {
            console.error('Failed to fetch requests', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSentRequests = async () => {
        setLoading(true);
        try {
            const data = await matchingService.getSentRequests();
            setSentRequests(data);
        } catch (error) {
            console.error('Failed to fetch sent requests', error);
        } finally {
            setLoading(false);
        }
    };


    const handleRequest = async (userId: number) => {
        try {
            if (!window.confirm('운동 파트너 요청을 보내시겠습니까?')) return;
            await matchingService.requestMatching(userId);
            setRequestedIds((prev) => [...prev, userId]);
            alert('성공적으로 요청을 보냈습니다!');
        } catch (error) {
            alert('이미 요청했거나 오류가 발생했습니다.');
        }
    };

    const handleRespond = async (matchId: number, action: 'accept' | 'reject') => {
        try {
            await matchingService.respondMatching(matchId, action);
            if (action === 'accept') {
                alert('매칭이 성사되었습니다! 채팅방이 생성됩니다.');
                navigate('/chat');
            } else {
                fetchRequests();
            }
        } catch (error) {
            console.error(error);
            alert('처리에 실패했습니다.');
        }
    };

    const getCareerLabel = (career?: User['career']) => {
        switch (career) {
            case 'BEGINNER': return '헬린이';
            case 'INTERMEDIATE': return '중급자';
            case 'ADVANCED': return '고수';
            case 'PRO': return '전문가';
            default: return '미설정';
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'PENDING':
                return <span className="flex items-center gap-1 text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full"><Clock size={12} /> 대기 중</span>
            case 'ACCEPTED':
                return <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full"><Check size={12} /> 수락됨</span>
            case 'REJECTED':
                return <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full"><XCircle size={12} /> 거절됨</span>
            default:
                return null;
        }
    }


    return (
        <div className="pb-24 px-4 pt-4 bg-slate-50 min-h-full">
            {/* 탭 메뉴 */}
            <div className="flex p-1 bg-white rounded-xl mb-6 shadow-sm border border-slate-100">
                <button
                    onClick={() => setActiveTab('recommend')}
                    className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${activeTab === 'recommend' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    추천 파트너
                </button>
                <button
                    onClick={() => setActiveTab('received')}
                    className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${activeTab === 'received' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    받은 요청 {requests.length > 0 && <span className="ml-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{requests.length}</span>}
                </button>
                <button
                    onClick={() => setActiveTab('sent')}
                    className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${activeTab === 'sent' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    보낸 요청
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-60 text-slate-400 text-sm">로딩 중...</div>
            ) : (
                <div className="space-y-4">
                    {/* TAB 1: 추천 파트너 */}
                    {activeTab === 'recommend' && (
                        candidates.length === 0 ? (
                            <div className="text-center py-20 text-slate-400">
                                <p>현재 추천할 파트너가 없습니다 😭</p>
                            </div>
                        ) : (
                            candidates.map((user) => {
                                const isRequested = requestedIds.includes(user.id);
                                return (
                                    <div key={user.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                                                {user.profileImage ? (
                                                    <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <UserIcon className="text-slate-400" size={32} />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-800">{user.name} <span className="text-xs font-normal text-slate-400 ml-1">{user.age ? `${user.age}세` : ''}</span></h3>
                                                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                                    <MapPin size={12} /> {user.region || '지역 미설정'}
                                                    <span className="mx-1">•</span>
                                                    <Dumbbell size={12} /> {getCareerLabel(user.career)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-xl text-sm text-slate-600">
                                            "{user.bio || '자기소개가 없습니다.'}"
                                        </div>
                                        <button
                                            onClick={() => handleRequest(user.id)}
                                            disabled={isRequested}
                                            className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2
                          ${isRequested ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'}`}
                                        >
                                            {isRequested ? '요청 완료' : <><Send size={18} /> 같이 운동하기</>}
                                        </button>
                                    </div>
                                );
                            })
                        )
                    )}

                    {/* TAB 2: 받은 요청 */}
                    {activeTab === 'received' && (
                        requests.length === 0 ? (
                            <div className="text-center py-20 text-slate-400">
                                <p>받은 요청이 없습니다.</p>
                            </div>
                        ) : (
                            requests.map((req) => (
                                req.requester && (
                                    <div key={req.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                                                {req.requester.profileImage ? (
                                                    <img src={req.requester.profileImage} alt={req.requester.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <UserIcon className="text-slate-400" size={32} />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-800">{req.requester.name}</h3>
                                                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                                    <MapPin size={12} /> {req.requester.region || '지역 미설정'}
                                                    <span className="mx-1">•</span>
                                                    <Dumbbell size={12} /> {getCareerLabel(req.requester.career)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-xl text-sm text-slate-600">
                                            "{req.requester.bio || '자기소개가 없습니다.'}"
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleRespond(req.id, 'accept')}
                                                className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-md flex items-center justify-center gap-2"
                                            >
                                                <Check size={18} /> 수락
                                            </button>
                                            <button
                                                onClick={() => handleRespond(req.id, 'reject')}
                                                className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200"
                                            >
                                                거절
                                            </button>
                                        </div>
                                    </div>
                                )))
                        )
                    )}

                    {/* TAB 3: 보낸 요청 */}
                    {activeTab === 'sent' && (
                        sentRequests.length === 0 ? (
                            <div className="text-center py-20 text-slate-400">
                                <p>보낸 요청이 없습니다.</p>
                            </div>
                        ) : (
                            sentRequests.map((req) => (
                                req.receiver && (
                                    <div key={req.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4 opacity-100">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                                                    {req.receiver.profileImage ? (
                                                        <img src={req.receiver.profileImage} alt={req.receiver.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <UserIcon className="text-slate-400" size={32} />
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-slate-800">{req.receiver.name}</h3>
                                                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                                                        <MapPin size={12} /> {req.receiver.region || '지역 미설정'}
                                                        <span className="mx-1">•</span>
                                                        <Dumbbell size={12} /> {getCareerLabel(req.receiver.career)}
                                                    </div>
                                                </div>
                                            </div>
                                            {getStatusBadge(req.status)}
                                        </div>

                                        {req.status === 'ACCEPTED' && (
                                            <button
                                                onClick={() => navigate('/chat')}
                                                className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-100 flex items-center justify-center gap-2"
                                            >
                                                <MessageCircle size={18} /> 채팅하러 가기
                                            </button>
                                        )}
                                    </div>
                                )))
                        )
                    )}
                </div>
            )}
        </div>
    );
}