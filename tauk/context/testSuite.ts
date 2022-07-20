import { TaukException } from "../exceptions";
import { TestCase } from "./testCase";


export class TestSuite {
    private _filename!: string;
    private _name?: string | undefined;
    private _className?: string | undefined;
    private _testCases: TestCase[] = [];

    constructor(filename: string) {
        this.filename = filename;
    }

    get name(): string | undefined {
        return this._name;
    }

    set name(value: string | undefined) {
        this._name = value;
    }

    get className(): string | undefined {
        return this._className;
    }

    set className(value: string | undefined) {
        this._className = value;
    }

    get filename(): string {
        return this._filename;
    }

    set filename(value: string) {
        this._filename = value;
    }

    get testCases(): TestCase[] {
        return this._testCases;
    }

    public addTestCase(testCase: TestCase) {
        for (const test of this._testCases) {
            if (test.methodName === testCase.methodName) {
                throw new TaukException('cannot use TaukListener and Observer() for the same test');
            }
        }

        this._testCases.push(testCase);
    }

    public removeTestCase(testMethodName: string) {
        this._testCases.forEach((item, index, object) => {
            if (item.methodName === testMethodName) {
                this._testCases.splice(index, 1);
            }
        })
    }

    public getTestCase(testName: string): TestCase | undefined {
        for (const test of this._testCases) {
            if (test.customName === testName || test.methodName === testName) {
                return test;
            }
        }
    }

    public toJson(): { [key: string]: any } {
        const json = {
            'filename': this.filename,
            'name': this.name,
            'class_name': this.className,
            'test_cases': this.testCases.map((t) => (t.toJson()))
        }
        return Object.fromEntries(Object.entries(json).filter(([_, v]) => v != null));
    }
}
