import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
    MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server!: Server;

    constructor(private readonly chatService: ChatService) { }

    handleConnection(client: Socket) {
        console.log(`[Chat] Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`[Chat] Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { roomId: number; userId: number },
    ) {
        client.join(`room-${data.roomId}`);
        console.log(`[Chat] User ${data.userId} joined room ${data.roomId}`);
    }

    @SubscribeMessage('sendMessage')
    async handleSendMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { roomId: number; senderId: number; content: string },
    ) {
        const message = await this.chatService.saveMessage(
            data.roomId,
            data.senderId,
            data.content,
        );

        this.server.to(`room-${data.roomId}`).emit('newMessage', message);
        return message;
    }
}
