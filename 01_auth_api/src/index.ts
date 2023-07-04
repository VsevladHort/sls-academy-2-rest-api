import * as dotenv from "dotenv";

dotenv.config();
import {getPool} from "./db/connection.js";
import express from "express";
import pg from "pg";
import authRouter from "./routers/auth.js"

const app = express();
const PORT = process.env.PORT ?? 5000;
let pool: pg.Pool = await getPool();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/health", async (req, res) => {
    res.json((await pool.query("SELECT NOW()")).rows);
});

app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

console.log("Reached end of file, new compiler options");