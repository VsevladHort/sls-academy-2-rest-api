import * as dotenv from "dotenv";

dotenv.config();
import {getPool} from "./db/connection.js";
import express from "express";

const app = express();
const PORT = process.env.PORT ?? 8000;
let pool = await getPool();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
}

function generateRandomLink(): string {
    const characters = process.env.ALLOWED_CHARS ?? "abcdefghijklmnopqrstuvwxyz0123456789";
    const length = parseInt(process.env.LINK_LENGTH ?? "10");
    let result = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

app.get("/health", async (req, res) => {
    res.json((await pool.query("SELECT NOW()")).rows);
});

app.post("/shorten", async (req, res) => {
    if (isValidUrl(req.body.link)) {
        let success = false;
        let shortenedLink = generateRandomLink();
        while (!success) {
            if ((await pool.query("SELECT * FROM short_links WHERE short_link = $1", [shortenedLink])).rows.length === 0)
                success = true;
        }
        if ((await pool.query("INSERT INTO short_links (short_link, long_link) VALUES ($1, $2) RETURNING *", [shortenedLink, req.body.link])).rows.length > 0)
            res.status(201).json({
                success: true,
                short_link: `http://localhost:${PORT}/${shortenedLink}`,
                link: req.body.link
            });
        else
            res.status(500).json({success: false, error: "Internal server error."});
    } else {
        res.status(400).json({success: false, error: "Bad URL provided to shortener."});
    }
});

app.get("/:short_link", async (req, res) => {
    if (req.params.short_link) {
        const longLink = (await pool.query("SELECT long_link FROM short_links WHERE short_link = $1", [req.params.short_link])).rows[0];
        if (longLink)
            res.redirect(longLink.long_link);
        else
            res.status(400).json({success: false, error: "Bad URL provided to shortener."});
    } else {
        res.status(400).json({success: false, error: "Bad URL provided to shortener."});
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`http://localhost:${PORT}/health`);
});