import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
    sub: string;
}

const ensureAuthenticated = async (request: Request, response: Response, next: NextFunction): Promise<Response | void> => {
    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).json({ error: 'JWT not found.' });
    }

    const [, token] = authToken.split(' ');

    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as ITokenPayload;

        request.user_id = sub;
    } catch {
        return response.status(401).json({ error: 'Invalid or expired JTW.' })
    }

    return next();
};

export default ensureAuthenticated;
