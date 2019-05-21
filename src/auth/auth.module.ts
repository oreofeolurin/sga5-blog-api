import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CoreModule } from '../core/core.module';
import { AuthService } from './auth.service';

@Module({
    imports: [CoreModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {
}
