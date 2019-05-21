import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../core/services/config.service';
import { AppException } from '../core/exceptions/app.exception';

@Injectable()
export class ApiGuard implements CanActivate {

    constructor(private config: ConfigService) {
    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        // lets first check if authorization is in headers or query
        const haystack = Object.assign(request.headers, request.query);

        if (typeof haystack.authorization === 'undefined')
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

        // now lets verify
        const verified = await this.verifyAuthorization(request, haystack.authorization);

        if (!verified) throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

        return true;
    }

    private verifyAuthorization(req: Request, authString: string) {

        try {
            const authContent = authString.split(' ');
            const auth = authContent[1];

            return this.authenticate(req, auth);

        } catch (err) {
            return false;
        }

    }

    /**
     * Authenticate via Wevied Json-web Tokens
     * @param req
     * @param token
     * @returns {Promise<any>}
     */
    public async authenticate(req, token) {

        const { sub } = await this.decodeJwtToken(token);

        req.locals = { user: { _id: sub } };

        return true;

    }

    /**
     *
     * @param token
     */
    public decodeJwtToken(token: string): Promise<{ sub: string }> {

        return new Promise((resolve, reject) => {

            jwt.verify(token, this.config.JWT_SECRET, (err, decodedToken) => {
                if (err) return reject(AppException.INVALID_TOKEN);

                return resolve(decodedToken);
            });

        });

    }

}
