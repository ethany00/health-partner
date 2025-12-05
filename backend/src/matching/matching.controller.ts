import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('matching')
@UseGuards(JwtAuthGuard)
export class MatchingController {
    constructor(private readonly matchingService: MatchingService) { }

    @Get('candidates')
    async getCandidates(@Request() req: any) {
        return this.matchingService.findCandidates(req.user.id);
    }

    @Post('request')
    async requestMatching(@Request() req: any, @Body('receiverId') receiverId: number) {
        return this.matchingService.requestMatching(req.user.id, receiverId);
    }

    @Get('requests')
    async getReceivedRequests(@Request() req: any) {
        return this.matchingService.getReceivedRequests(req.user.id);
    }

    @Get('sent')
    async getSentRequests(@Request() req: any) {
        return this.matchingService.getSentRequests(req.user.id);
    }

    @Post('respond/:id')
    async respondMatching(
        @Request() req: any,
        @Param('id') id: string,
        @Body('action') action: 'accept' | 'reject',
    ) {
        return this.matchingService.respondMatching(req.user.id, parseInt(id), action);
    }
}
