import { Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

class AuthenticateUserController {
    public async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { code } = request.body;

            const authenticateUserService = new AuthenticateUserService();

            const result = await authenticateUserService.execute(code);

            return response.json(result);
        } catch(error) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export default AuthenticateUserController;
