import { HttpStatus } from '@nestjs/common';
import { CustomException } from '../core/exceptions/custom-exception';
import { AccountStatus, AppStatus } from '../core/helpers/enums';

export class AuthException extends CustomException {

    constructor(err: any,
                code: number = AppStatus.BASIC_AUTH_ERROR,
                status: number = HttpStatus.INTERNAL_SERVER_ERROR,
                message = 'Basic Auth Exception',
                body?: any) {

        super(err, code, status, message, body);
    }

    public static ACCOUNT_INACTIVE(status: AccountStatus.PENDING | AccountStatus.SUSPENDED | AccountStatus.TERMINATED, body?: any) {
        let code;
        switch (status) {
            case AccountStatus.PENDING:
                code = AppStatus.ACCOUNT_PENDING;
                break;
            case AccountStatus.SUSPENDED:
                code = AppStatus.ACCOUNT_SUSPENDED;
                break;
            case AccountStatus.TERMINATED:
                code = AppStatus.ACCOUNT_TERMINATED;
                break;
        }
        return new this(undefined, code, HttpStatus.UNAUTHORIZED, `This account is ${status.toLowerCase()}`, body);

    }

    public static get INVALID_PASSWORD() {
        return new this('Invalid Password', AppStatus.BASIC_AUTH_INVALID_PASSWORD, HttpStatus.UNAUTHORIZED);
    }

}
