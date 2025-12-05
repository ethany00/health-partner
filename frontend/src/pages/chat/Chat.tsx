import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { chatService, type ChatRoom } from '../../services/chatService';
import { MessageCircle, User as UserIcon } from 'lucide-react';

export default function Chat() {
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchChatRooms();
    }, []);

    const fetchChatRooms = async () => {
        try {
            const data = await chatService.getChatRooms();
            setChatRooms(data);
        } catch (error) {
            console.error('Failed to fetch chat rooms', error);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return '방금 전';
        if (minutes < 60) return `${minutes}분 전`;
        if (hours < 24) return `${hours}시간 전`;
        if (days < 7) return `${days}일 전`;
        return date.toLocaleDateString('ko-KR');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full min-h-[500px] text-slate-400">
                로딩 중...
            </div>
        );
    }

    return (
        <div className="pb-20 bg-slate-50 min-h-full">
            {/* Header */}
            <div className="bg-white px-6 py-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800">채팅</h2>
                <p className="text-sm text-slate-500 mt-1">
                    {chatRooms.length}개의 대화
                </p>
            </div>

            {/* Chat Room List */}
            <div className="divide-y divide-slate-100">
                {chatRooms.length === 0 ? (
                    <div className="text-center py-20 text-slate-400">
                        <MessageCircle size={48} className="mx-auto mb-4 opacity-30" />
                        <p>아직 채팅방이 없습니다.</p>
                        <p className="text-xs mt-2">매칭을 수락하면 채팅방이 생성됩니다!</p>
                    </div>
                ) : (
                    chatRooms.map((room) => (
                        <div
                            key={room.id}
                            onClick={() => navigate(`/chat/${room.id}`)}
                            className="bg-white p-5 hover:bg-slate-50 cursor-pointer transition-colors flex items-center gap-4"
                        >
                            {/* Profile Image */}
                            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                                {room.partner?.profileImage ? (
                                    <img
                                        src={room.partner.profileImage}
                                        alt={room.partner.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <UserIcon className="text-slate-400" size={28} />
                                )}
                            </div>

                            {/* Chat Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-base font-bold text-slate-800 truncate">
                                        {room.partner?.name || '알 수 없음'}
                                    </h3>
                                    <span className="text-xs text-slate-400 ml-2 shrink-0">
                                        {formatTime(room.lastMessage?.createdAt)}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 truncate">
                                    {room.lastMessage?.content || '메시지를 보내보세요!'}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}