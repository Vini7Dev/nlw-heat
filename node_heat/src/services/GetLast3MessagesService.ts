import prismaClient from '../prisma';
import { Message } from '.prisma/client';

class GetLast3MessagesService {
    public async execute(): Promise<Message[]> {
        const messages = await prismaClient.message.findMany({
            take: 3,
            orderBy: {
                created_at: 'desc',
            },
            include: {
                user: true,
            }
        });

        return messages;
    }
}

export default GetLast3MessagesService;
