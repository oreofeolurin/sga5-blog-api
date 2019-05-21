import {HttpStatus} from '@nestjs/common';
import {CustomException} from './custom-exception';
import {AppStatus} from '../helpers/enums';

export class AppException extends CustomException {

    constructor(err: any, code: number, status: number = HttpStatus.INTERNAL_SERVER_ERROR, message = 'App Exception') {
        super(err, code, status, message);
    }

    public static get INVALID_TOKEN() {
        return new this('Invalid Token', AppStatus.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
    }
}
