import * as dotenv from "dotenv";

dotenv.config();
import {getPool} from "../db/connection.js";
import express from "express";
import {validateToken} from "../middleware/tokenValidator.js";

const pool = await getPool();

const userRouter = express();

userRouter.get("/me", validateToken, async (req, res) => {
    const existingUser = await pool.query("SELECT * FROM site_user WHERE id_site_user = $1", [req.body.id_site_user])
    if (existingUser.rows.length > 0) {
        try {
            res.status(200).json({
                success: true,
                data: {
                    id: existingUser.rows[0].id_site_user,
                    email: existingUser.rows[0].email,
                }
            });
        } catch (err) {
            res.status(500).json({success: false, error: "Internal server error"});
        }
    } else {
        res.status(404).json({success: false, error: `User was not found`});
    }
});

export default userRouter;