import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';
import {Injectable} from '@nestjs/common';
import {AppStatus} from '../helpers/enums';
import {AppException} from '../exceptions/app.exception';

interface EnvConfig {
    [prop: string]: string;
}

const EnvSchema = Joi.object({
    NODE_ENV: Joi.string().valid(['development', 'production', 'staging']).default('development'),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string(),
});

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor() {
        const config = process.env.NODE_ENV && process.env.NODE_ENV !== 'development' ? process.env : dotenv.parse(fs.readFileSync('.env'));
        this.envConfig = ConfigService.validateInput(config);
    }

    private static validateInput(envConfig: EnvConfig): EnvConfig {
        const {error, value: validatedEnvConfig} = Joi.validate(envConfig, EnvSchema, {allowUnknown: true});

        if (error) {
            throw new AppException(`Config validation error: ${error.message}`, AppStatus.CONFIGURATION_ERROR);
        }
        return validatedEnvConfig;
    }

    get PORT(): number {
        return parseInt(this.envConfig.PORT, 10);
    }

    get JWT_SECRET(): string {
        return this.envConfig.JWT_SECRET;
    }
}
