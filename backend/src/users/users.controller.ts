import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@Request() req: any) {
        // req.user는 JwtStrategy가 검증 후 넣어준 User 객체입니다.
        // 민감한 정보는 이미 validate 메서드 혹은 서비스에서 제외되었을 수 있지만, 
        // 여기서 한번 더 안전하게 비밀번호를 제외합니다.
        const { password, hashedRefreshToken, ...result } = req.user;
        return result;
    }
}
