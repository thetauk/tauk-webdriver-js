import {TaukConfig} from "../config";
import {TaukApi} from "../api";
import {TestData} from "./test_data";

class TaukContext {
    private readonly _projectRootDir: string
    public testData: TestData
    public api: TaukApi

    public runId?: string

    constructor(public taukConfig: TaukConfig) {
        this.testData = new TestData()
        this.api = new TaukApi(taukConfig.apiToken!, taukConfig.projectId!, taukConfig.multiProcessRun)
        this._projectRootDir = taukConfig.projectRootDir

        this.initRun()
    }

    get projectRootDir(): string {
        return this._projectRootDir;
    }

    private initRun(runId?: string) {
        (async () => {
            try {
                this.runId = await this.api.initializeRun(this.testData, runId)
            } catch (e) {
                throw e;
            } finally {
                // TODO: ?
            }
        })()
    }

}

export {TaukContext}