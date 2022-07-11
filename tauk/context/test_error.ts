class TestError {
    constructor(public errorType: string,
                public errorMsg: string,
                public lineNumber: number,
                public invokedFunction: string,
                public codeExecuted: string) {
    }
}

export {TestError}