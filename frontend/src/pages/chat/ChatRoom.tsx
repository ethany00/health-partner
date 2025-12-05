import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { chatService, type Message } from '../../services/chatService';
import { useAuthStore } from '../../store/authStore';
import { Send } from 'lucide-react';

export default function ChatRoom() {
    const { roomId } = useParams<{ roomId: string }>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    const socketRef = useRef<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!roomId || !user) {
            setError('사용자 정보를 불러올 수 없습니다.');
            setLoading(false);
            return;
        }

        // 메시지 목록 불러오기
        fetchMessages();

        // WebSocket 연결
        console.log('[Chat] Connecting to WebSocket...');
        socketRef.current = io('http://localhost:4000', {
            transports: ['websocket', 'polling'],
        });

        socketRef.current.on('connect', () => {
            console.log('[Chat] Connected to WebSocket');
            socketRef.current?.emit('joinRoom', {
                roomId: parseInt(roomId),
                userId: user.id,
            });
        });

        socketRef.current.on('connect_error', (err) => {
            console.error('[Chat] Connection error:', err);
            setError('실시간 연결에 실패했습니다.');
        });

        socketRef.current.on('newMessage', (message: Message) => {
            console.log('[Chat] New message received:', message);
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            console.log('[Chat] Disconnecting...');
            socketRef.current?.disconnect();
        };
    }, [roomId, user]);

    useEffect(() => {
        // 새 메시지가 추가되면 스크롤을 맨 아래로
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchMessages = async () => {
        if (!roomId) return;
        try {
            const data = await chatService.getChatRoomMessages(parseInt(roomId));
            setMessages(data);
            console.log('[Chat] Messages loaded:', data.length);
        } catch (error: any) {
            console.error('Failed to fetch messages', error);
            setError(error.response?.data?.message || '메시지를 불러올 수 없습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !roomId || !user) return;

        console.log('[Chat] Sending message:', newMessage);
        socketRef.current?.emit('sendMessage', {
            roomId: parseInt(roomId),
            senderId: user.id,
            content: newMessage.trim(),
        });

        setNewMessage('');
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full min-h-[500px] text-slate-400">
                로딩 중...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-full min-h-[500px] text-slate-400">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={() => navigate('/chat')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    채팅 목록으로 돌아가기
                </button>
            </div>
        );
    }

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="flex flex-col h-[calc(100dvh-3.5rem-4rem)] bg-slate-50">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4">
                {messages.length === 0 ? (
                    <div className="text-center py-10 text-slate-400 text-sm">
                        첫 메시지를 보내보세요!
                    </div>
                ) : (
                    messages.map((message, index) => {
                        const isMyMessage = message.senderId === user?.id;
                        const showAvatar =
                            index === 0 ||
                            messages[index - 1].senderId !== message.senderId;

                        return (
                            <div
                                key={message.id}
                                className={`flex gap-2 mb-3 ${isMyMessage ? 'flex-row-reverse' : ''}`}
                            >
                                {/* Avatar */}
                                {!isMyMessage && showAvatar && (
                                    <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
                                )}
                                {!isMyMessage && !showAvatar && <div className="w-8 shrink-0" />}

                                {/* Message Bubble */}
                                <div className={`flex flex-col ${isMyMessage ? 'items-end' : 'items-start'}`}>
                                    {!isMyMessage && showAvatar && (
                                        <span className="text-xs text-slate-600 mb-1 px-2">
                                            {message.sender.name}
                                        </span>
                                    )}
                                    <div
                                        className={`max-w-xs px-4 py-2.5 rounded-2xl ${isMyMessage
                                                ? 'bg-blue-600 text-white rounded-br-sm'
                                                : 'bg-white text-slate-800 rounded-bl-sm'
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap break-words">
                                            {message.content}
                                        </p>
                                    </div>
                                    <span className="text-[10px] text-slate-400 mt-1 px-2">
                                        {formatTime(message.createdAt)}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-slate-200 p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="메시지를 입력하세요..."
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}
