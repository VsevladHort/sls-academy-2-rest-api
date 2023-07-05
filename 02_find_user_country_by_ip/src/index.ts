import * as dotenv from "dotenv";

dotenv.config();
import express from "express";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.enable('trust proxy')

app.get("/health", async (req, res) => {
    res.json({success: true, ip: req.ip});
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`http://localhost:${PORT}/health`);
});

console.log("Reached end of file. Truly.");