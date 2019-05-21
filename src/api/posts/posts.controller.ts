import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { ApiGuard } from '../api.guard';
import { CreatePostDto, PostIdDto } from './posts.dto';
import { PostsService } from './posts.service';

@ApiUseTags('posts')
@Controller('/posts')
@UseGuards(ApiGuard)
export class PostsController {

    constructor(private readonly service: PostsService) {
    }

    @Get('/')
    public async getAllPost() {

        const posts = await this.service.getUserPosts();

        return { code: HttpStatus.OK, message: 'Request Successful', body: { posts } };
    }

    @Post('/')
    public async createPost(@Req() req, @Body() params: CreatePostDto) {

        const user = req.locals.user;

        let post = await this.service.create(user._id, params);
        post = Object.assign({}, post, { author: user });

        return {
            code: HttpStatus.CREATED,
            message: 'Successfully Created',
            body: { post },
        };
    }

    @Get('/:postId')
    public async getPost(@Param() params) {

        await this.service.getPost(params.postId);

        return { code: HttpStatus.OK, message: 'Request Successful' };
    }

    @Patch('/:postId')
    public async edit(@Req() req, @Body() body: CreatePostDto, @Param() params: PostIdDto) {

        const post = await this.service.edit(params.postId, body);

        return {
            code: HttpStatus.OK, message: 'Request Successful',
            body: { post },
        };
    }

    @Delete('/:postId')
    public async deletePost(@Param() params: PostIdDto) {

        await this.service.delete(params.postId);

        return { code: HttpStatus.OK, message: 'Request Successful' };
    }
}
