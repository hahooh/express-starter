import Config from "../services/config";
import { Request, Response } from "express";
import BadRequest from "../Errors/badRequest";

export default class Controller {
    protected getIntFromQuery(req: Request, key: string): number {
        const intString = req.query[key] as string;
        const int = parseInt(intString);
        if (isNaN(int)) {
            throw new BadRequest(`Invalid ${key}`);
        }
        return int;
    }

    protected getIntFromParams(req: Request, key: string): number {
        const intString = req.params[key];
        const int = parseInt(intString);
        if (isNaN(int)) {
            throw new BadRequest(`Invalid ${key}`);
        }
        return int;
    }

    protected getTokenFromHeader(req: Request): string {
        const bearerToken = req.headers.authorization || "";
        if (!bearerToken.includes("Bearer ")) {
            return "";
        }

        if (bearerToken) {
            return bearerToken.replace("Bearer ", "");
        }
        return "";
    }

    protected success(res: Response, data: any, statusCode: number = 200) {
        res.status(statusCode).json(data);
    }

}