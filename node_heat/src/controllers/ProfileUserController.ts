import { Request, Response } from 'express';
import ProfileUserService from '../services/ProfileUserService';

class  ProfileUserController {
    public async handle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request;
        
        const profileUserService = new ProfileUserService();

        const profile = await profileUserService.execute(user_id);

        return response.json(profile);
    }
}

export default  ProfileUserController;
