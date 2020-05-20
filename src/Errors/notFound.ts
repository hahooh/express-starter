import IError from "./error";

export class NotFound extends Error implements IError {
    public httpStausCode = 404
    constructor(message: string) {
        super(message)
    }
}