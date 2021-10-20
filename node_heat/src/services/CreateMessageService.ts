import prismaClient from '../prisma';
import { Message } from '.prisma/client';

class CreateMessageService {
    public async execute(text: string, user_id: string): Promise<Message> {
        const message = await prismaClient.message.create({
            data: {
                text,
                user_id,
            },
            include: {
                user: true,
            },
        });

        return message;
    }
}

export default CreateMessageService;
