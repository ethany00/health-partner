import { useState, useEffect, useRef } from 'react';
import type {Message} from '../../types';
import { useAuthStore } from '../../store/authStore';

interface ChatRoom {
    id: string;
    partnerId: string;
    partnerName: string;
    lastMessage?: string;
    unreadCount: number;
}

export default function Chat() {
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { user } = useAuthStore();

    useEffect(() => {
        // TODO: 실제 API 연결
        // 임시 더미 데이터
        setChatRooms([
            {
                id: '1',
                partnerId: '1',
                partnerName: '김철수',
                lastMessage: '내일 몇 시에 만날까요?',
                unreadCount: 2,
            },
            {
                id: '2',
                partnerId: '2',
                partnerName: '이영희',
                lastMessage: '오늘 운동 어떠셨어요?',
                unreadCount: 0,
            },
        ]);
    }, []);

    useEffect(() => {
        if (selectedRoom) {
            // TODO: 실제 API 연결 및 Socket.io 연결
            // 임시 더미 데이터
            setMessages([
                {
                    id: '1',
                    senderId: selectedRoom.partnerId,
                    receiverId: user?.id || '',
                    content: '안녕하세요! 같이 운동하게 되어 반가워요.',
                    createdAt: new Date(Date.now() - 3600000).toISOString(),
                    isRead: true,
                },
                {
                    id: '2',
                    senderId: user?.id || '',
                    receiverId: selectedRoom.partnerId,
                    content: '네, 반갑습니다! 언제 만나실 수 있으세요?',
                    createdAt: new Date(Date.now() - 1800000).toISOString(),
                    isRead: true,
                },
            ]);
        }
    }, [selectedRoom, user]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedRoom) return;

        const message: Message = {
            id: Date.now().toString(),
            senderId: user?.id || '',
            receiverId: selectedRoom.partnerId,
            content: newMessage,
            createdAt: new Date().toISOString(),
            isRead: false,
        };

        setMessages([...messages, message]);
        setNewMessage('');

        // TODO: Socket.io로 메시지 전송
    };

    return (
        <div className="flex h-[calc(100vh-64px)]">
            {/* 채팅방 목록 */}
            <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">채팅</h2>
                </div>
                <div className="divide-y divide-gray-200">
                    {chatRooms.map((room) => (
                        <button
                            key={room.id}
                            onClick={() => setSelectedRoom(room)}
                            className={`w-full p-4 text-left hover:bg-gray-50 transition ${
                                selectedRoom?.id === room.id ? 'bg-blue-50' : ''
                            }`}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold">{room.partnerName}</h3>
                                {room.unreadCount > 0 && (
                                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {room.unreadCount}
                  </span>
                                )}
                            </div>
                            {room.lastMessage && (
                                <p className="text-sm text-gray-600 truncate">{room.lastMessage}</p>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* 채팅 영역 */}
            {selectedRoom ? (
                <div className="flex-1 flex flex-col bg-gray-50">
                    {/* 채팅 헤더 */}
                    <div className="bg-white border-b border-gray-200 p-4">
                        <h2 className="text-xl font-semibold">{selectedRoom.partnerName}</h2>
                    </div>

                    {/* 메시지 목록 */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => {
                            const isOwn = message.senderId === user?.id;
                            return (
                                <div
                                    key={message.id}
                                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                                            isOwn
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white text-gray-800 border border-gray-200'
                                        }`}
                                    >
                                        <p>{message.content}</p>
                                        <p
                                            className={`text-xs mt-1 ${
                                                isOwn ? 'text-blue-100' : 'text-gray-500'
                                            }`}
                                        >
                                            {new Date(message.createdAt).toLocaleTimeString('ko-KR', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* 메시지 입력 */}
                    <form onSubmit={handleSendMessage} className="bg-white border-t border-gray-200 p-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="메시지를 입력하세요..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition font-semibold"
                            >
                                전송
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <p className="text-gray-500 text-lg">채팅방을 선택해주세요</p>
                </div>
            )}
        </div>
    );
}