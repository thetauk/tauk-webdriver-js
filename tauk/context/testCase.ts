import { AutomationTypes, PlatformNames, TestStatus } from "../enums";
import { logger } from "../taukWebdriver";
import { TaukException } from "../exceptions";
import { CodeContext, TestCaseError } from "../types";

export abstract class TestCase {

    private _id?: string;
    private _customName?: string;
    private _methodName?: string;
    private _status?: TestStatus;
    private _excluded: boolean = false;
    private _automationType?: AutomationTypes;
    private _platformName?: PlatformNames;
    private _platformVersion?: string;
    private _browserName?: string;
    private _browserVersion?: string;
    private _startTimestamp?: number;
    private _endTimestamp?: number;
    private _timezone?: string;
    private _error?: TestCaseError;
    private _screenshot?: string;
    private _view?: string;
    private _codeContext: CodeContext[] = [];

    private _browserDebugger = {address: '', pageId: ''};
    private _attachments = {};
    private _tags: { [key: string]: string } = {};
    private _userData: { [key: string]: string | number } = {};
    private _log = [{}];

    protected constructor() {
        this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
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

    get status(): TestStatus | undefined {
        return this._status;
    }

    set status(value: TestStatus | undefined) {
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

    get error(): TestCaseError | undefined {
        return this._error;
    }

    set error(value: TestCaseError | undefined) {
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

    get codeContext(): CodeContext[] {
        return this._codeContext;
    }

    set codeContext(value: CodeContext[]) {
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
        this._browserDebugger.address = address;
        this._browserDebugger.pageId = pageId;
    }

    public addAttachment(filePath: string, type: string) {
        logger.debug(`Adding attachment ${type}: ${filePath}`);
        // TODO: Implement this
    }

    public addTag(name: string, value: string) {
        logger.debug(`Adding tag ${name}: ${value}`);
        this._tags[name] = value;
    }

    public addUserData(name: string, value: string | number) {
        if (name.length > 100 || (typeof value == "string")) {
            throw new TaukException('user data is too large');
        }
        this._userData[name] = value;
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
        };
        return Object.fromEntries(Object.entries(json).filter(([_, v]) => v != null));
    }
}
