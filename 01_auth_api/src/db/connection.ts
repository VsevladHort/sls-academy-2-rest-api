import * as dotenv from "dotenv";

dotenv.config();

import pg from "pg";
import fs from 'fs';

const initializationScriptFilePath = '../../db-init.sql';


let pool: pg.Pool | null = null;

export const getPool = async (): Promise<pg.Pool> => {
    if (!pool) {
        pool = new pg.Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT ?? ''),
        });
        await pool.query(fs.readFileSync(initializationScriptFilePath, 'utf8'));
    }

    return pool;
};