export interface TestCaseError {
    errorType: string;
    errorMsg: string;
    lineNumber: number;
    invokedFunc: string;
    codeExecuted: string;
}

export interface CodeContext {
    lineNumber: number;
    lineCode: string;
}
