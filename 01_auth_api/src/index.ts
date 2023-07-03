import * as dotenv from "dotenv";

dotenv.config();
import {getPool} from "./db/connection";
import express from "express";
import {Pool} from "pg";

const app = express();
let pool: Pool;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/health", async (req, res) => {
    res.json((await pool.query("SELECT NOW()")).rows);
});

const PORT = process.env.PORT ?? 5000;

getPool().then((res) => {
    pool = res;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
        console.log(`http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("Failed database connection or initialization");
    console.error(err);
});

console.log("Reached end of file");