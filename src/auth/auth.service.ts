import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { AccountStatus } from '../core/helpers/enums';
import { ConfigService } from '../core/services/config.service';
import { AuthException } from './auth.exception';
import { USERS } from '../core/helpers/constants';

@Injectable()
export class AuthService {
    private users = USERS;

    constructor(
        private readonly config: ConfigService) {
    }

    private composeUserWithToken(user) {

        return user.status === AccountStatus.ACTIVE
            ? { user, token: this.createToken(user) }
            : { user };
    }

    private createToken(user) {
        const signature = { sub: user._id, ver: user.__v };

        // lets create the token
        return jwt.sign(signature, this.config.JWT_SECRET, {
            expiresIn: '60d',
            issuer: 'blog:blog-api',
        });
    }

    async getUserToken(basic) {

        const user = await this.authenticateUserByCredentials(basic);

        return this.composeUserWithToken(user);
    }

    private async authenticateUserByCredentials(params) {
        // lets create the credentials
        const email = params.email.toLowerCase().trim(),
            password = params.password.trim();

        const user = this.users.find(doc => doc.email === email);

        if (user.password !== password) {
            throw AuthException.INVALID_PASSWORD;
        }

        // lets make sure his account is active
        if (user.status !== AccountStatus.ACTIVE) {
            throw AuthException.ACCOUNT_INACTIVE(user.status);
        }

        return user;
    }

    public async createAccount(user) {
        user.status = AccountStatus.ACTIVE;
        this.users.push(user as any);

        return this.composeUserWithToken(user);
    }

}
