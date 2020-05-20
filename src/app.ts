import express, { Request, Response, NextFunction } from 'express'
import Config from './services/config'
import Logger from './services/logger'
import { Middlewares } from './middlewares/middlewares'
import bodyParser from 'body-parser'
import IError from './Errors/error'

class App {
    private readonly config = new Config()
    private readonly app = express()

    constructor() {
        Logger.intLogger(this.config)
        this.initMiddlewares()
    }

    public run() {
        this.app.listen(this.config.port, () => Logger.log.info(`API running on port ${this.config.port}`))
    }

    private initMiddlewares() {
        const middlewares = new Middlewares()
        this.app.use(middlewares.requestLogger)
        this.app.use(middlewares.CORS)
        this.app.use(middlewares.optionsHandler)
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json())
    }

    private errorHandler() {
        this.app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
            Logger.log.error(err.stack || err.message)
            const statusCode = err.httpStausCode || 500
            const message = statusCode ? err.message : 'Internal Error'
            res.status(statusCode).json(message)
        })
    }
}

export default new App()