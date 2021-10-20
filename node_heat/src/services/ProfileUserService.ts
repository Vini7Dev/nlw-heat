import prismaClient from '../prisma';
import { User } from '.prisma/client';

class ProfileUserService {
    public async execute(user_id: string): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: { id: user_id },
        })

        return user;
    }
}

export default ProfileUserService;
