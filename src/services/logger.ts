import winston, { config, loggers } from 'winston'
import Config from './config'
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios'

export default class Logger {
    public static log: winston.Logger;

    public static intLogger(config: Config) {
        this.log = winston.createLogger({
            level: config.isProduction ? 'info' : 'silly',
            transports: [
                new winston.transports.Console(),
            ],
            format: winston.format.printf(({ level, message }) => {
                const now = new Date()
                return `${now.toISOString()} [${level.toUpperCase()}] - ${message}`
            })
        })

        this.initResponseLog()
    }

    private static initResponseLog() {
        axios.interceptors.response.use((res: AxiosResponse) => {
            Logger.logHTTP(`Response status ${res.status}`, res.config)
            return res
        }, (err: AxiosError) => {
            if (err.response) {
                Logger.logHTTP(`Response error status ${err.response.status}`, err.config)
            } else {
                Logger.logHTTP(`Response error status ${err.message}`, err.config)
            }
            return Promise.reject(err)
        })
    }

    private static logHTTP(message: string, config: AxiosRequestConfig) {
        Logger.log.info(`${message} ${config.method} ${config.baseURL}/${config.url}`)
    }
}