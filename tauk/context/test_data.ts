import {TestSuite} from "./test_suite";
import {logger} from "../tauk_webdriver";
import {TestCase} from "./test_case";

class TestData {
    public taukClientVersion: string;
    public language = 'python';
    public startTimestamp = new Date().getTime();
    public timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    public dst = false // TODO: Implement this

    private _testSuites: TestSuite[] = []

    constructor() {
        this.taukClientVersion = process.env.npm_package_version || 'develop'
        console.log(this.taukClientVersion)
    }

    get testSuites(): TestSuite[] {
        return this._testSuites;
    }

    public getTestSuite(filename: string): TestSuite | undefined {
        for (let suite of this._testSuites) {
            if (suite.filename === filename) {
                return suite
            }
        }
    }

    public addTestCase(fileName: string, testCase: TestCase) {
        let suite = this.getTestSuite(fileName)
        if (!suite) {
            suite = new TestSuite(fileName)
            this._testSuites.push(suite)
        }

        suite.addTestCase(testCase)
    }

    public deleteTestCase(fileName: string, testMethodName: string) {
        const suite = this.getTestSuite(fileName)
        if (!suite) {
            logger.warning(`Failed to delete test case ${fileName}>${testMethodName}`)
        } else {
            logger.debug(`Deleting test case ${fileName}>${testMethodName}`)
            suite.removeTestCase(testMethodName)
        }
    }
}

export {TestData}