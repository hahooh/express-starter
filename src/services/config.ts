export default class Config {
    constructor() {
        require('dotenv').config()
    }

    get port(): number {
        const port = process.env.PORT
        if (!port) {
            throw new Error("Port not set")
        }
        return parseInt(port)
    }

    get isProduction(): string {
        const env = process.env.ENV
        if (!env) {
            throw new Error("ENV not set")
        }
        return env
    }
}