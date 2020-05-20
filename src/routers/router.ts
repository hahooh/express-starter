import express, { IRoute, Handler } from 'express'
import Config from '../services/config'
import { Method } from 'axios'

interface IRouter extends express.Router {
    [key: string]: any
}

export default abstract class Router<T> {
    public router: IRouter = express.Router()
    protected readonly controller: T
    protected readonly path: string | undefined

    constructor(config: Config) {
        const controllerName = this.constructor.name
            .replace(/^\w/, c => c.toLocaleLowerCase())
            .replace('Router', '')
        const controller = require(`.../controllers/${controllerName}`).default
        if (!controller) {
            throw new Error(`Controller ${controllerName} not found`)
        }

        this.controller = new controller(config)
    }

    public abstract initRouters(): void

    get routerPath(): string {
        return this.path || "/" + this.constructor.name
            .replace("Router", "")
            .replace(/[A-Z]/g, (match, offset, string) => {
                return (offset > 0 ? "-" : "") + match.toLocaleLowerCase();
            });
    }

    protected post(path: string, ...handler: Handler[]) {
        this.bindController("post", path, handler);
    }

    protected get(path: string, ...handler: Handler[]) {
        this.bindController("get", path, handler);
    }

    protected put(path: string, ...handler: Handler[]) {
        this.bindController("put", path, handler);
    }

    protected patch(path: string, ...handler: Handler[]) {
        this.bindController("patch", path, handler);
    }

    protected delete(path: string, ...handler: Handler[]) {
        this.bindController("delete", path, handler);
    }

    private bindController(method: Method, path: string, handlers: Handler[]) {
        this.router[method.toLocaleLowerCase()](path, handlers.map((handler) => handler.bind(this.controller)));
    }
}