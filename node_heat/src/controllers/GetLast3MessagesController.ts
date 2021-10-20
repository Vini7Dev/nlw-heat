import { Request, Response } from 'express';
import GetLast3MessagesService from '../services/GetLast3MessagesService';

class  GetLast3MessagesCotnroller {
    public async handle(request: Request, response: Response): Promise<Response> {
        const getLast3MessagesService = new GetLast3MessagesService();

        const messages = await getLast3MessagesService.execute();

        return response.json(messages);
    }
}

export default  GetLast3MessagesCotnroller;
