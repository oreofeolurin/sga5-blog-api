import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './posts.dto';
import { POSTS } from '../../core/helpers/constants';

@Injectable()
export class PostsService {

    private posts = POSTS;

    constructor() {
    }

    public async create(userId: string, body: CreatePostDto) {

        // clean data
        const post = {
            postId: ++this.posts.length,
            title: body.title.trim(),
            content: body.content,
        };

        this.posts.push(post);

        return post;

    }

    public async edit(postId: number, body: CreatePostDto) {

        const updateObject = {
            postId,
            title: body.title.trim(),
            content: body.content,
        };

        const index = this.posts.findIndex(doc => doc.postId === postId);

        this.posts[index] = updateObject;

        return updateObject;

    }

    public async delete(id: number) {
        const index = this.posts.findIndex(doc => doc.postId === id);

        delete this.posts[index];
    }

    public async getUserPosts() {
        return await this.posts;

    }

    public async getPost(postId: number) {
        return this.posts.find(doc => doc.postId === postId);
    }
}
