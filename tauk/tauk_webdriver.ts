import {TaukContext} from "./context/context";
import {TaukConfig} from "./config";
import {Mutex} from 'async-mutex';
import winston, {Logger} from "winston";
import path from "path";
import * as os from "os";
import * as fs from "fs";
import DailyRotateFile from "winston-daily-rotate-file";

const mutex = new Mutex();

const setupLogger = () => {
    const logFilename = path.join(os.homedir(), '.tauk', 'logs', 'tauk-webdriver-js.log')
    fs.mkdirSync(path.dirname(logFilename), {recursive: true})
    process.env.TAUK_HOME = path.join(os.homedir(), '.tauk')
    let logLevel = process.env.TAUK_LOG_LEVEL || 'info'
    if (!['debug', 'info', 'warn', 'error'].includes(logLevel)) {
        logLevel = 'info'
    }

    const l = winston.createLogger({
        level: logLevel.toLowerCase(),
        format: winston.format.combine(
            winston.format.splat(),
            winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            winston.format.printf(({level, message, timestamp, ...metadata}) => {
                return `${timestamp} ${process.pid} ${level.toUpperCase()} ${message}`
            })
        ),
        transports: [
            // new winston.transports.File({filename: logFilename}),
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.printf(info =>
                        `${info.timestamp} ${process.pid} ${info.level} ${info.message}`
                    )
                )
            }),
            new DailyRotateFile({
                dirname: path.dirname(logFilename),
                filename: 'tauk-webdriver-js.log',
                options: {flags: 'a'},
                datePattern: 'YYYY-MM-DD HH:mm:ss',
                maxSize: '10m',
                maxFiles: 3,
                createSymlink: true,
                symlinkName: 'tauk-webdriver-js.log'
            })
        ],
    })
    l.debug('Initialized logger')
    return l;
}

const logger = setupLogger()


class Tauk {
    private static instance: PrivateTauk
    private static _context: TaukContext

    private constructor() {
        throw new Error('Use Tauk.getInstance()')
    }

    private static destroy(eventType: any) {
        // TODO: Setup exit handler
        throw Error('destroy')
    }

    public static getInstance(taukConfig?: TaukConfig) {
        if (!Tauk.instance) {
            // this.setupLogger()
            if (!taukConfig) {
                taukConfig = new TaukConfig()
            }
            logger.debug(`Creating new Tauk instance with config [${JSON.stringify(taukConfig)}]`)
            Tauk.instance = new PrivateTauk(taukConfig);
            Tauk._context = new TaukContext(taukConfig)

            process.on('exit', Tauk.destroy)

        }

        return Tauk.instance
    }

    public static isInitialized(): boolean {
        return !!Tauk.instance;
    }


}

class PrivateTauk {
    private static context: TaukContext
    private static config: TaukConfig

    constructor(taukConfig: TaukConfig) {

        PrivateTauk.config = taukConfig
    }


}


export {Tauk, logger}