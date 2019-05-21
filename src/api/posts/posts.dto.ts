import { IsDefined, IsString } from 'class-validator';

export class CreatePostDto {
    @IsString()
    title: string;

    @IsDefined()
    content: string;

    postId?: number;
}

export class PostIdDto {
    @IsString()
    postId: number;
}
