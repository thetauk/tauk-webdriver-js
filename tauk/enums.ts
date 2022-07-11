class TaukEnum {
    static asArray: TaukEnum[] = [];

    constructor(public readonly value: string) {
        TaukEnum.asArray.push(this)
    }

    getValue() {
        return this.value;
    }
}

class TestStatus extends TaukEnum {
    static readonly FAILED = new TestStatus('failed')
    static readonly PASSED = new TestStatus('passed')
    static readonly EXCLUDED = new TestStatus('excluded')
}


class BrowserNames extends TaukEnum {
    static readonly CHROME = new TestStatus('chrome')
    static readonly FIREFOX = new TestStatus('firefox')
    static readonly EDGE = new TestStatus('edge')
    static readonly SAFARI = new TestStatus('safari')

    static resolve(name: string): BrowserNames | undefined {
        switch (name.toLowerCase()) {
            case 'chrome':
                return BrowserNames.CHROME
            case 'firefox':
                return BrowserNames.FIREFOX
            case 'edge':
                return BrowserNames.EDGE
            case 'safari':
                return BrowserNames.SAFARI
        }
    }
}

class AutomationTypes extends TaukEnum {
    static readonly APPIUM = new TestStatus('appium')
    static readonly SELENIUM = new TestStatus('selenium')
    static readonly ESPRESSO = new TestStatus('espresso')
    static readonly XCTEST = new TestStatus('xctest')
}

class PlatformNames extends TaukEnum {
    static readonly IOS = new TestStatus('ios')
    static readonly ANDROID = new TestStatus('android')
    static readonly WINDOWS = new TestStatus('windows')
    static readonly LINUX = new TestStatus('linux')
    static readonly MACOS = new TestStatus('macos')

    static resolve(name: string): PlatformNames | undefined {
        switch (name.toLowerCase()) {
            case 'mac':
                return PlatformNames.MACOS
            case 'windows':
                return PlatformNames.WINDOWS
            case 'linux':
                return PlatformNames.LINUX
            case 'android':
                return PlatformNames.ANDROID
            case 'ios':
                return PlatformNames.IOS
        }
    }
}

class AttachmentTypes extends TaukEnum {
    static readonly ASSISTANT_CONSOLE_LOGS = new TestStatus('Runtime.consoleLogs')
    static readonly ASSISTANT_EXCEPTION_LOGS = new TestStatus('Runtime.exceptionLogs')
    static readonly ASSISTANT_BROWSER_LOGS = new TestStatus('Log.browserLogs')
}


export {TestStatus, BrowserNames, TaukEnum, PlatformNames, AttachmentTypes, AutomationTypes}