import * as dotenv from "dotenv";

dotenv.config();
import {getPool} from "./db/connection.js";
import express from "express";

const app = express();
const PORT = process.env.PORT ?? 8000;
let pool = await getPool();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/health", async (req, res) => {
    res.json((await pool.query("SELECT NOW()")).rows);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`http://localhost:${PORT}/health`);
});