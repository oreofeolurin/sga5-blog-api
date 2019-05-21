import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ParamValidationPipe } from './core/pipes/param-validation.pipe';
import { ConfigService } from './core/services/config.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
    });
    app.useGlobalPipes(new ParamValidationPipe());
    const config = app.get(ConfigService);

    const options = new DocumentBuilder()
        .setTitle('Blog API')
        .setDescription('The Blog API description')
        .setVersion('0.0.1')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(config.PORT);
}

bootstrap();
