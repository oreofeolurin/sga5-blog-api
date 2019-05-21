import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
    imports: [CoreModule],
    providers: [PostsService],
    controllers: [PostsController],
    exports: [PostsService],
})
export class PostsModule {
}
