import * as dotenv from "dotenv";

dotenv.config();

import {Pool} from "pg";
import fs from 'fs';

const initializationScriptFilePath = 'F:\\projects\\sls-academy-2-rest-api\\01_auth_api\\db-init.sql';

export const getPool = async () => {
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT ?? ""),
    });
    await pool.query(fs.readFileSync(initializationScriptFilePath, 'utf8'));
    return pool;
}

