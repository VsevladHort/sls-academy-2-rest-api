import {NextFunction, Request, Response} from "express";
import {readToken} from "../utils/tokenGenerator.js";

export async function validateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const header: string | undefined = req.header("Authorization");

    if (!header) {
        res.status(403).json({error: 'Not authorized'});
        return;
    }

    try {
        const claims = await readToken(header.split(" ")[1]);
        if (typeof claims === "string") {
            res.status(403).json({error: 'Not authorized'});
            return;
        }
        req.body.id_site_user = claims["id_site_user"];
    } catch (err) {
        res.status(403).json({error: 'Not authorized'});
        return;
    }

    next();
}