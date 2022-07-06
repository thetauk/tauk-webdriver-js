import * as os from "os";
import {logger, Tauk} from "./tauk_webdriver";
import axios, {AxiosRequestConfig, AxiosRequestHeaders, Method} from "axios";
import {TaukException} from "./exceptions";
import {TestData} from "./context/test_data";

const REQUEST_TIMEOUT = 30000;

interface RequestBody {
    [key: string]: any;
}

class TaukApi {
    private TAUK_API_URL = 'https://www.tauk.com/api/v1'

    private readonly API_URL: string
    public runId: string = ''

    private axiosInstance = axios.create()


    constructor(private _apiToken: string, private _projectId: string, private multiProcessRun = false) {
        this.API_URL = process.env.TAUK_API_URL || this.TAUK_API_URL
        this._apiToken = _apiToken
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${this.apiToken}`;
    }

    get apiToken(): string {
        return this._apiToken;
    }

    get projectId(): string {
        return this._projectId;
    }

    set apiToken(value: string) {
        this._apiToken = value;
    }

    set projectId(value: string) {
        this._projectId = value;
    }


    public async request(method: Method, url: string, data?: object, headers?: AxiosRequestHeaders,
                         timeout = REQUEST_TIMEOUT) {
        // const authHeaders = new Map([['Authorization', `Bearer ${this.apiToken}`]])
        url = 'https://fec88f12-667e-48d5-abc0-dd9c50c17f2f.mock.pstmn.io/api/v1/execution/projectid/initialize'
        console.log(`Making request ${method}: ${url}:`, headers, data)
        const response = await this.axiosInstance.request({
            method: method,
            url: url,
            headers: headers,
            data: data
        })
        console.log("#######################")
        console.log(`response:`, response)
        return response
    }

    public async initializeRun(testData: TestData, runId?: string) {
        const url = `${this.API_URL}/execution/${this.projectId}/initialize`
        let body: RequestBody = {
            'language': testData.language,
            'tauk_client_version': testData.taukClientVersion,
            'start_timestamp': new Date().getTime(),
            'timezone': testData.timezone,
            'dst': testData.dst,
            'multi_process_run': this.multiProcessRun,
            'host_os_name': os.type(),
            'host_os_version': os.release() // TODO: Currently ut returns kernel version which is not same as python
        }

        //If run_id already exists then it will validate the run_id on the server side
        if (runId) {
            body.runId = runId
        }

        logger.debug(`Initializing run with: url[%O], body[%O]`, url, body)
        const response = await this.request('POST', url, body)
        if (response.status !== 200) {
            logger.error(`Failed to initialize Tauk execution. Response[${response.status}]: ${response.data}`)
            throw new TaukException('failed to initialize tauk execution')
        }

        logger.debug(`Response: ${response.data}`)
        this.runId = response.data.run_id
        return this.runId
    }


}

export {TaukApi}