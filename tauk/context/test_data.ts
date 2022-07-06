class TestData {
    public taukClientVersion: string;
    public language = 'python';
    public startTimestamp = new Date().getTime();
    public timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    public dst = false // TODO: Implement this

    // private test_suites:
    constructor() {
        this.taukClientVersion = 'TODO'

    }
}

export {TestData}