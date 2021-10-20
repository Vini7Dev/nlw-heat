import axios from 'axios';
import { User } from '.prisma/client';
import { sign } from 'jsonwebtoken';

import prismaClient from '../prisma';

interface IAccessTokenResponse {
    access_token: string;
}

interface IUserResponse {
    id: number;
    avatar_url: string;
    login: string;
    name: string;
}

interface IResponse {
    token: string;
    user: User;
}

class AuthenticateUserService {
    public async execute(code: string): Promise<IResponse> {
        const url = 'https://github.com/login/oauth/access_token';

        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                'Accept': 'application/json',
            }
        });

        const { data: userDataResponse } = await axios.get<IUserResponse>('https://api.github.com/user', {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`,
            },
        });

        const { id, login, avatar_url, name } = userDataResponse;

        let user = await prismaClient.user.findFirst({
            where: { github_id: id },
        });

        if(!user) {
            user = await prismaClient.user.create({
                data: {
                    github_id: id,
                    avatar_url,
                    login,
                    name,
                },
            });
        }

        const token = sign({
            user: {
                id: user.id,
                avatar_url: user.avatar_url,
                login: user.login,
                name: user.name,
            }
        }, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: '1d',
        });

        return { token, user };
    }
}

export default AuthenticateUserService;
