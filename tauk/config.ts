import {TaukException} from "./exceptions";

class TaukConfig {
    private readonly _multiProcessRun: boolean
    private readonly _apiToken?: string
    private readonly _projectId?: string
    private readonly _apiUrl: string
    private _cleanupExecutionContext: boolean
    private _projectRootDir: string


    constructor(apiToken?: string, projectId?: string, multiProcessRun?: boolean) {
        if (multiProcessRun === undefined) {
            if (process.env.MULTIPROCESS_RUN !== undefined) {
                this._multiProcessRun = process.env.MULTIPROCESS_RUN.toLowerCase() === 'false'
            } else {
                this._multiProcessRun = false
            }
        } else {
            this._multiProcessRun = multiProcessRun
        }

        this._apiToken = this.getValueFromPropertyOrEnv(apiToken, 'TAUK_API_TOKEN')
        this._projectId = this.getValueFromPropertyOrEnv(projectId, 'TAUK_PROJECT_ID')
        this._apiUrl = process.env.TAUK_API_URL || 'https://www.tauk.com/api/v1'
        this._cleanupExecutionContext = true
        this._projectRootDir = process.cwd()
    }

    private getValueFromPropertyOrEnv(prop: string | undefined, envVar: string): string | undefined {
        if (prop !== undefined) {
            return prop
        } else if (process.env[envVar]) {
            return process.env[envVar]
        } else if (this.multiProcessRun) {
            return undefined
        }

        // Multiprocess runs don't need API Token/ Project ID because it could be read from the exec file
        throw new TaukException(`could not find a valid environment variable $${envVar}`)
    }

    get multiProcessRun(): boolean {
        return this._multiProcessRun;
    }

    get apiToken(): string | undefined {
        return this._apiToken;
    }

    get projectId(): string | undefined {
        return this._projectId;
    }

    get apiUrl(): string {
        return this._apiUrl;
    }

    get cleanupExecutionContext(): boolean {
        return this._cleanupExecutionContext;
    }

    get projectRootDir(): string {
        return this._projectRootDir;
    }

    set cleanupExecutionContext(value: boolean) {
        this._cleanupExecutionContext = value;
    }

    set projectRootDir(value: string) {
        this._projectRootDir = value;
    }
}

export {TaukConfig}