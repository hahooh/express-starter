import { Request, Response, NextFunction } from "express";
import Logger from "../services/logger";

export class Middlewares {
    public CORS(req: Request, res: Response, next: NextFunction) {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS")
        res.header("Access-Control-Allow-Headers", "apiKey,Content-Type,Authorization,X-Requested-With")
        next()
    }

    public optionsHandler(req: Request, res: Response, next: NextFunction) {
        if (req.method !== "options") {
            return next()
        }
        res.status(200).json(null)
    }

    public requestLogger(req: Request, res: Response, next: NextFunction) {
        res.on('finish', () => {
            const method = req.method
            const url = req.url
            const ip = req.ip
            const now = new Date()
            const statusCode = res.status
            Logger.log.info(`${now.toISOString()} ${method.toLocaleLowerCase()} ${url} ${statusCode} ${ip}`)
        })
        next()
    }
}