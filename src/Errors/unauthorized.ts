import IError from "./error";

export class Unathorized extends Error implements IError {
    httpStausCode = 401
    constructor(message: string) {
        super(message)
    }
}