import { NextFunction, Request, Response } from "express";
import { getTimeStamp } from "./src/utils/common";
import path from 'path';
class Logger {

    constructor() {
        console.log(`------------------------------------------------------------\n`);
        // console.log(`:: ${require(path.join(__dirname,'package.json')).name} ::               (v${require(path.join(__dirname,'package.json')).version})\n`);
        console.log(`------------------------------------------------------------\n`);
    }

    log(log: any) {
        console.log(`[${getTimeStamp()}] ` + log);
    }

    error(err: any) {
        console.log(`[${getTimeStamp()}] ` + err);
    }

    logEvents(req: Request, res: Response, next: NextFunction) {
        console.log(`[${getTimeStamp()}] ` + `[${req.headers.origin ?? 'localhost'}] [${req.method.toUpperCase()}] [${req.path}]`);
        return next();
    }

}

const _logger = new Logger();
export default _logger;