import {Request, Response, NextFunction} from 'express';

export function validateSignInAndUpInformation(req: Request, res: Response, next: NextFunction): void {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const emailRegex: RegExp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (!password || !email || !emailRegex.test(email) || password.length < 8) {
        res.status(400).json({error: 'Invalid email address or password'});
        return;
    }

    next();
}