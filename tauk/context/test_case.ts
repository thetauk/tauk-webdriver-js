import {AutomationTypes, PlatformNames, TaukEnum, TestStatus} from "../enums";
import {logger} from "../tauk_webdriver";
import {TaukException} from "../exceptions";

abstract class TestCase {

    private _id: string | undefined
    private _customName: string | undefined
    private _methodName: string | undefined
    private _status: string | undefined
    private _excluded: boolean = false
    private _automationType: AutomationTypes | undefined
    private _platformName: PlatformNames | undefined
    private _platformVersion: string | undefined
    private _browserName: string | undefined
    private _browserVersion: string | undefined
    private _startTimestamp: number | undefined
    private _endTimestamp: number | undefined
    private _timezone: string | undefined
    private _error: TypeError | undefined
    private _screenshot: string | undefined
    private _view: string | undefined
    private _codeContext = {}

    private _browserDebugger = {address: '', pageId: ''}
    private _attachments = {}
    private _tags: { [key: string]: string } = {}
    private _userData: { [key: string]: string | number } = {}
    private _log = [{}]

    protected constructor() {
    }

    get id(): string | undefined {
        return this._id;
    }

    set id(value: string | undefined) {
        this._id = value;
    }

    get customName(): string | undefined {
        return this._customName;
    }

    set customName(value: string | undefined) {
        this._customName = value;
    }

    get methodName(): string | undefined {
        return this._methodName;
    }

    set methodName(value: string | undefined) {
        this._methodName = value;
    }

    get status(): string | undefined {
        return this._status;
    }

    set status(value: string | undefined) {
        this._status = value;
    }

    get excluded(): boolean {
        return this._excluded;
    }

    set excluded(value: boolean) {
        this._excluded = value;
    }

    get automationType(): AutomationTypes | undefined {
        return this._automationType;
    }

    set automationType(value: AutomationTypes | undefined) {
        this._automationType = value;
    }

    get platformName(): PlatformNames | undefined {
        return this._platformName;
    }

    set platformName(value: PlatformNames | undefined) {
        this._platformName = value;
    }

    get platformVersion(): string | undefined {
        return this._platformVersion;
    }

    set platformVersion(value: string | undefined) {
        this._platformVersion = value;
    }

    get browserName(): string | undefined {
        return this._browserName;
    }

    set browserName(value: string | undefined) {
        this._browserName = value;
    }

    get browserVersion(): string | undefined {
        return this._browserVersion;
    }

    set browserVersion(value: string | undefined) {
        this._browserVersion = value;
    }

    get startTimestamp(): number | undefined {
        return this._startTimestamp;
    }

    set startTimestamp(value: number | undefined) {
        this._startTimestamp = value;
    }

    get endTimestamp(): number | undefined {
        return this._endTimestamp;
    }

    set endTimestamp(value: number | undefined) {
        this._endTimestamp = value;
    }

    get timezone(): string | undefined {
        return this._timezone;
    }

    set timezone(value: string | undefined) {
        this._timezone = value;
    }

    get error(): TypeError | undefined {
        return this._error;
    }

    set error(value: TypeError | undefined) {
        this._error = value;
    }

    get screenshot(): string | undefined {
        return this._screenshot;
    }

    set screenshot(value: string | undefined) {
        this._screenshot = value;
    }

    get view(): string | undefined {
        return this._view;
    }

    set view(value: string | undefined) {
        this._view = value;
    }

    get codeContext(): {} {
        return this._codeContext;
    }

    set codeContext(value: {}) {
        this._codeContext = value;
    }

    get attachments(): {} {
        return this._attachments;
    }

    get browserDebugger(): { address: string; pageId: string } {
        return this._browserDebugger;
    }

    get tags(): { [p: string]: string } {
        return this._tags;
    }

    get userData(): { [p: string]: string | number } {
        return this._userData;
    }

    get log(): {}[] {
        return this._log;
    }

    public setBrowserDebugger(address: string, pageId: string): void {
        this._browserDebugger.address = address
        this._browserDebugger.pageId = pageId
    }

    public addAttachment(filePath: string, type: string) {
        logger.debug(`Adding attachment ${type}: ${filePath}`)
        // TODO: Implement this
    }

    public addTag(name: string, value: string) {
        logger.debug(`Adding tag ${name}: ${value}`)
        this._tags[name] = value
    }

    public addUserData(name: string, value: string | number) {
        if (name.length > 100 || (typeof value == "string")) {
            throw new TaukException('user data is too large')
        }
        this._userData[name] = value
    }

    public toJson(): { [key: string]: any } {
        const json = {
            'id': this.id,
            'custom_name': this.customName,
            'method_name': this.methodName,
            'status': this.excluded ? TestStatus.EXCLUDED : this.status,
            'automation_type': this.automationType,
            'platform_name': this.platformName,
            'platform_version': this.platformVersion,
            'browser_name': this.browserName,
            'browser_version': this.browserVersion,
            'start_timestamp': this.startTimestamp,
            'end_timestamp': this.endTimestamp,
            'timezone': this.timezone,
            'error': this.error,
            'screenshot': this.screenshot,
            'view': this.view,
            'code_context': this.codeContext,
            'tags': this.tags,
            'user_data': this.userData,
            'log': this.log,
        }
        return Object.fromEntries(Object.entries(json).filter(([_, v]) => v != null));
    }
}

export {TestCase}