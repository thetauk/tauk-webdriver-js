import { logger } from "../taukWebdriver";
import { TestCase } from "./testCase";
import { TestSuite } from "./testSuite";

export class TestData {
    public taukClientVersion?: string;
    public language: string = 'javascript';
    public startTimestamp: number = Date.now();
    public timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
    public dst: boolean = this.isDstInEffect();

    private _testSuites: TestSuite[] = []

    constructor() {
        // this.taukClientVersion = process.env.npm_package_version || 'develop'
        // console.log(this.taukClientVersion)
    }

    // Source: tinyurl.com/2p9n5ns9
    private isDstInEffect(currentDate = new Date()): boolean {
        const january = new Date(currentDate.getFullYear(), 0, 1).getTimezoneOffset();
        const july = new Date(currentDate.getFullYear(), 6, 1).getTimezoneOffset();

        return Math.max(january, july) !== currentDate.getTimezoneOffset();
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

    public addTestCase(filename: string, testCase: TestCase) {
        let suite = this.getTestSuite(filename)
        if (!suite) {
            suite = new TestSuite(filename)
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
