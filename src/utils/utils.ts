import { NextFunction, Request, Response } from "express";

// colored logging
export const logInfo = (msg: any) =>
    console.info(`\x1b[36m%s\x1b[0m`, `[INFO] ${msg}`);
export const logError = (msg: any) => console.error(`\x1b[31m`, `[ERR] ${msg}`);
export const logWarn = (msg: any) => console.warn(`\x1b[33m`, `[WARN] ${msg}`);

// exception handler
type ErrorRequestHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => any;

export const errorRequestMiddleware: ErrorRequestHandler = (
    err,
    _,
    res,
    next
) => {
    logError(err);
    return res.status(500).json({ message: "Internal server error" });
};

export function validateBodyArgs(...args: any[]): boolean {
    for (var element of args) {
        console.log(element);
        if (element == undefined || element == null) {
            return false;
        }
    }

    return true;
}
