import jwt, {JwtPayload} from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export type UserClaims = {
    id_site_user: string
}

export type AccessTokenOptions = {
    expiresIn: string | undefined
}

export async function generateToken(claims: any, options: object): Promise<string> {
    return jwt.sign(claims, process.env.JWT_SECRET as string, options);
}

export async function generateAccessToken(claims: UserClaims, options: AccessTokenOptions): Promise<string> {
    return generateToken(claims, options);
}

export async function generateRefreshToken(claims: UserClaims, options: AccessTokenOptions): Promise<string> {
    return generateToken(claims, options);
}

export async function readToken(token: string): Promise<string | JwtPayload> {
    return jwt.verify(token, process.env.JWT_SECRET as string);
}