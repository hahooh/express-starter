import IError from './error'
import http from 'http'

export default class BadRequest extends Error implements IError {
    public httpStausCode = 400
    constructor(message: string) {
        super(message)
    }
}