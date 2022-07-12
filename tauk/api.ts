import * as os from "os";
import {logger, Tauk} from "./tauk_webdriver";
import axios, {AxiosRequestConfig, AxiosRequestHeaders, Method} from "axios";
import {TaukException} from "./exceptions";
import {TestData} from "./context/test_data";
import {readFileSync} from "fs";
import {AttachmentTypes} from "./enums";

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
        const response = await this.axiosInstance.request({
            method: method,
            url: url,
            headers: headers,
            data: data,
            timeout: timeout
        })
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
            logger.error(`Failed to initialize Tauk execution. Response[${response.status}]: ${JSON.stringify(response.data)}`)
            throw new TaukException('failed to initialize tauk execution')
        }

        logger.debug(`Response: ${JSON.stringify(response.data)}`)
        this.runId = response.data.run_id
        return this.runId
    }


    public async testStart() {
        // TODO
    }

    public async testFinish() {
        // TODO
    }

    public async upload(testData: TestData) {
        const url = `${this.API_URL}/execution/${this.projectId}/${this.runId}/report/upload`
        const headers = {'Content-Encoding': 'gzip'}

        logger.debug(`Uploading test: url[${url}], headers[${headers}], body[${(testData)}]`) // TODO: Shorten testData

        const response = await this.request('POST', url, testData)
        if (response.status !== 200) {
            logger.error(`Failed to upload test. Response[${response.status}]: ${JSON.stringify(response.data)}`)
            throw new TaukException('failed to upload test results')
        }

        logger.debug(`Response: ${JSON.stringify(response.data)}`)
        return response.data.result
    }

    public async uploadAttachment(filePath: string, attachmentType: AttachmentTypes, testId: string) {
        if (!testId) {
            throw new TaukException(`invalid test_id ${testId}`)
        }
        const url = `${this.API_URL}/execution/${this.projectId}/${this.runId}/attachment/upload/${testId}`
        const headers = {'Tauk-Attachment-Type': `${attachmentType}`}

        logger.debug(`Uploading test attachment: url[${url}], headers[${headers}], file[${filePath}]`)
        const body = readFileSync(filePath)
        const response = await this.request('POST', url, body)
        if (response.status !== 200) {
            logger.error(`Failed to upload attachment. Response[${response.status}]: ${JSON.stringify(response.data)}`)
            throw new TaukException('failed to upload attachment')
        }
    }

    public async finishExecution(filePath: string | undefined) {
        const endTimestamp = new Date().getTime();
        const url = `${this.API_URL}/execution/${this.projectId}/${this.runId}/finish/${endTimestamp}`

        if (!filePath) {
            logger.debug(`Sending execution finish: url[${url}]`)
            const response = await this.request('POST', url)
            if (response.status !== 200) {
                logger.error(`Failed to upload execution error logs. Response[${response.status}]: ${JSON.stringify(response.data)}`)
                throw new TaukException('failed to upload execution error logs')
            }
            return
        }

        const headers = {'Content-Encoding': 'gzip'}
        logger.debug(`Sending execution finish: url[${url}], headers[${headers}], file[${filePath}]`)
        const body = readFileSync(filePath)
        const response = await this.request('POST', url, body, headers)
        if (response.status !== 200) {
            logger.error(`Failed to upload execution error logs. Response[${response.status}]: ${JSON.stringify(response.data)}`)
            throw new TaukException('failed to upload execution error logs')
        }
    }
}

export {TaukApi}