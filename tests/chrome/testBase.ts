import { remote, Browser, Element } from "webdriverio";

const MAX_ELEMENT_THRESHOLD = 60000;

type TestDetails = {
	driver: Browser<any> | null;
	sessionId: string;
	caps: any,
	webdriver_path: '/wd/hub';
	webdriver_port: 4723;
	test_start_time_ms: number;
	test_end_time_ms: number;
};

const initTest: () => TestDetails = () => {
	return {
		driver: null,
		sessionId: '',
		caps: {},
		webdriver_path: '/wd/hub',
		webdriver_port: 4723,
		test_start_time_ms: 0,
		test_end_time_ms: 0
	}
}

const setUp = async (testDetails: TestDetails, preLaunch: (testDetails: TestDetails) => void) => {
	preLaunch(testDetails);
	testDetails.driver = await remote({
		logLevel: 'trace',
		capabilities: {
			...testDetails.caps
		}
	});
	testDetails.sessionId = testDetails.driver.sessionId;
	testDetails.test_start_time_ms = Date.now();
}

const tearDown = async (testDetails: TestDetails) => {
	await new Promise(res => setTimeout(res, 5 * 1000));
	console.log("Test Finished");
	testDetails.test_end_time_ms = Date.now();
	testDetails.driver!.deleteSession();
}

// ------ Helper Methods -------

const findElement = async (driver: Browser<any> | null, elementLocator: string, timeout: number = MAX_ELEMENT_THRESHOLD) => {
	const loginButton: Element<any> = await driver!.$(elementLocator);
	await loginButton.waitForExist({ timeout: timeout });
	return loginButton;
}

const clickElement = async (driver: Browser<any> | null, elementLocator: string, timeout: number = MAX_ELEMENT_THRESHOLD) => {
	const loginButton: Element<any> = await findElement(driver!, elementLocator, timeout);
	await loginButton.click();
}

const setValueOfElement = async (driver: Browser<any> | null, elementLocator: string, timeout: number = MAX_ELEMENT_THRESHOLD, value: string = "") => {
	const loginButton: Element<any> = await findElement(driver!, elementLocator, timeout);
	await loginButton.setValue(value);
}

export { TestDetails, setUp, tearDown, initTest, findElement, clickElement, setValueOfElement };
