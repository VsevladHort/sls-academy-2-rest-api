import * as dotenv from "dotenv";

dotenv.config();
import fs from "fs";

const csvData = fs.readFileSync(process.env.DB_FILE_PATH as string)
    .toString()
    .split("\n")
    .map(x => x.trim().split(","))
    .map(x => x.map(y => y.replace(/"/g, "")));

const ipRangeArray = csvData.map(([start, end, _, country]) => ({
    start: parseInt(start),
    end: parseInt(end),
    country
})).sort((a, b) => a.start - b.start);

function binarySearch(ip: number, ipRanges: { start: number; end: number; country: string }[]): string {
    let low = 0;
    let high = ipRanges.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const range = ipRanges[mid];

        if (ip >= range.start && ip <= range.end) {
            return range.country;
        } else if (ip < range.start) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return 'Not Found';
}

// stolen from https://stackoverflow.com/questions/8105629/ip-addresses-stored-as-int-results-in-overflow
function dot2num(dot: string) {
    const d = dot.split('.');
    return ((((((+d[0]) * 256) + (+d[1])) * 256) + (+d[2])) * 256) + (+d[3]);
}

export function lookupLocation(ip: string) {
    return binarySearch(dot2num(ip), ipRangeArray);
}