import { Request, Response } from 'express';
import CreateMessageService from '../services/CreateMessageService';

class CreateMessageController {
    public async handle(request: Request, response: Response): Promise<Response> {
        const { message } = request.body;
        const { user_id } = request;

        const createMessageService = new CreateMessageService();

        const mesageCreated = await createMessageService.execute(message, user_id);

        return response.status(201).json(mesageCreated);
    }
}

export default CreateMessageController;
