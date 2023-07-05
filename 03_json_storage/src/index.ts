import * as dotenv from "dotenv";

dotenv.config();
import express from "express";
import * as fs from "fs";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.enable('trust proxy')

app.get("*", async (req, res) => {
    const pathToResource = "." + req.path;
    if (!fs.existsSync(pathToResource)) {
        res.status(404).json({success: false, path: req.path});
        return;
    }
    try {
        const contents: object = JSON.parse((await fs.promises.readFile(pathToResource + "/json.json")).toString("utf8"));
        res.json(contents);
    } catch (e) {
        res.status(500).json({success: false, path: req.path, error: "Internal server error"});
        console.error(e);
    }
});

app.put("*", async (req, res) => {
    const pathToResource = "." + req.path;
    if (fs.existsSync(pathToResource)) {
        res.status(409).json({success: false, path: pathToResource, error: "Resource already exists"});
        return;
    }
    try {
        await fs.promises.mkdir(pathToResource, {recursive: true});
        await fs.promises.writeFile(pathToResource + "/json.json", JSON.stringify(req.body));
        res.status(201).json({success: true, path: req.path});
    } catch (e) {
        res.status(500).json({success: false, path: req.path, error: "Internal server error"});
        console.error(e);
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});