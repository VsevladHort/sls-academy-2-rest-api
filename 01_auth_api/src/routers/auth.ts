import * as dotenv from "dotenv";

dotenv.config();
import {getPool} from "../db/connection.js";
import express from "express";
import {validateSignInAndUpInformation} from "../middleware/emailValidator.js";
import {randomUUID} from "crypto";
import bcrypt from "bcrypt";
import {generateAccessToken, generateToken} from "../utils/tokenGenerator.js";

const pool = await getPool();

const authRouter = express();

authRouter.post("/sign-in", validateSignInAndUpInformation, (req, res) => {
    res.sendStatus(200);
});

authRouter.post("/sign-up", validateSignInAndUpInformation, async (req, res) => {
    const existingUser = await pool.query("SELECT * FROM site_user WHERE email = $1", [req.body.email])
    if (existingUser.rows.length > 0) {
        res.status(409).json({success: false, error: `User with email ${req.body.email} already exists`});
        return;
    }
    try {
        const uuid = randomUUID();
        const hashedPass = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS as string));
        const user = await pool.query("INSERT INTO site_user (id_site_user, email, user_pass) VALUES ($1, $2, $3) RETURNING *",
            [uuid, req.body.email, hashedPass]);
        if (user.rows.length > 0) {
            const accessToken = await generateAccessToken({id_site_user: user.rows[0].id_site_user}, {expiresIn: process.env.JWT_EXPIRATION});
            const refreshToken = await generateToken({id_site_user: user.rows[0].id_site_user}, {});
            res.status(201).json({
                success: true,
                data: {
                    id: user.rows[0].id_site_user,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
            })
        } else
            res.status(500).json({success: false, error: "Internal server error"});
    } catch (err) {
        res.status(500).json({success: false, error: "Internal server error"});
    }
});

export default authRouter;