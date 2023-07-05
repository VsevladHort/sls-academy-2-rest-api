import * as dotenv from "dotenv";

dotenv.config();
import express from "express";
import {lookupLocation} from "./locationDetector.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.enable('trust proxy')

app.get("/health", async (req, res) => {
    res.json({success: true, ip: req.ip});
});

app.post("/location", async (req, res) => {
    if (validateIPv4address(req.ip) && validateIPv4address(req.body.ip)) {
        const requesterLocation = lookupLocation(req.ip);
        const requestLocation = lookupLocation(req.body.ip);
        console.log(`${requesterLocation} - ${req.ip}`);
        console.log(`${requestLocation} - ${req.body.ip}`);
        res.json(
            [
                {
                    success: true,
                    ipData:
                        {
                            ip: req.ip,
                            country: requesterLocation,
                            readable: `${requesterLocation} - ${req.ip}`
                        }
                },
                {
                    success: true,
                    ipData:
                        {
                            ip: req.body.ip,
                            country: requestLocation,
                            readable: `${requestLocation} - ${req.body.ip}`
                        }
                }
            ]
        );
    } else if (validateIPv4address(req.ip)) {
        const requesterLocation = lookupLocation(req.ip);
        console.log(`${requesterLocation} - ${req.ip}`);
        res.json(
            [
                {
                    success: true,
                    ipData:
                        {
                            ip: req.ip,
                            country: requesterLocation,
                            readable: `${requesterLocation} - ${req.ip}`
                        }
                },
                {
                    success: false,
                    error: "Incorrect ip or no ip was provided in the body"
                }
            ]
        );
    } else if (validateIPv4address(req.body.ip)) {
        const requestLocation = lookupLocation(req.body.ip);
        console.log(`${requestLocation} - ${req.body.ip}`);
        res.json(
            [
                {
                    success: false,
                    error: "Incorrect ip or no ip was provided in the body"
                },
                {
                    success: true,
                    ipData:
                        {
                            ip: req.body.ip,
                            country: requestLocation,
                            readable: `${requestLocation} - ${req.body.ip}`
                        }
                }
            ]
        );
    }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

function validateIPv4address(ipaddress: string | null | undefined) {
    if (ipaddress === null || ipaddress === undefined)
        return false;
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress);
}