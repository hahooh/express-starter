import IError from "./error";

export class Forbidden extends Error implements IError {
    httpStausCode = 403
    constructor(message: string) {
        super(message)
    }
}