import { AccountStatus } from './enums';

export const USERS = [
    {
        name: 'Oreofe Olurin',
        email: 'oreofeolurin@gmail.com',
        password: 'password',
        status: AccountStatus.ACTIVE,
    },
    {
        name: 'Tomiwa Tomike',
        email: 'ttomike@gmail.com',
        password: 'password',
        status: AccountStatus.PENDING,
    },

    {
        name: 'Pelumi Adebayo',
        email: 'padebayo@gmail.com',
        password: 'password',
        status: AccountStatus.ACTIVE,
    },
];

export const POSTS = [
    {
        postId: 1,
        title: 'This is a post',
        content: 'Contents of a post',
    },
];
