import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Get('rooms')
    async getMyChatRooms(@Request() req: any) {
        return this.chatService.getMyChatRooms(req.user.id);
    }

    @Get('rooms/:id/messages')
    async getChatRoomMessages(@Request() req: any, @Param('id') id: string) {
        return this.chatService.getChatRoomMessages(parseInt(id), req.user.id);
    }
}
