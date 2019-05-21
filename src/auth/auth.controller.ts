import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Utils } from '../core/helpers/utils';
import { CreateUserDto, CredentialDto } from './auth.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post('/login')
    public async login(@Req() req, @Body() body: CredentialDto) {
        const userDto = { email: body.email.trim(), password: body.password.trim() };

        const { user, token } = await this.authService.getUserToken(userDto);

        return { user: Utils.pickKeys(user, 'email name'), token };
    }

    @Post('/signup')
    public async signup(@Req() req, @Body() body: CreateUserDto) {
        const userDto = {
            password: body.password && body.password.trim(),
            email: body.email && body.email.trim(),
            name: body.name,
        };

        const { user, token } = await this.authService.createAccount(userDto);

        return { user: Utils.pickKeys(user, 'email name'), token };
    }
}
