import { NextFunction, Request, Response } from "express";
import { getTimeStamp } from "./src/utils/common";

class Logger {

    constructor() {
        console.log(`------------------------------------------------------------\n`);
        console.log(`:: ${require('./package.json').name} ::               (v${require('./package.json').version})\n`);
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