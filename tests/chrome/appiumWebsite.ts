import {
	TestDetails,
	setUp,
	tearDown,
	initTest,
	clickElement,
} from "./testBase";
import { baseCapabilities } from "./projectCapabilities";
import AppiumIO from "./viewObjects/AppiumIO";
import Tauk from "../../src/tauk"; // Import the Tauk package

describe("Appium IO", function () {
	this.timeout(500000);
	const testDetails: TestDetails = initTest();
	// Create an instance of the Tauk class and provide your API TOKEN and PROJECT ID
	const tauk: Tauk = new Tauk("API-TOKEN", "PROJECT-ID");
	const preLaunch = (testDetails: TestDetails) => {
		testDetails.caps = baseCapabilities();
	};

	beforeEach(async () => {
		await setUp(testDetails, preLaunch);
		// Provide your driver object
		tauk.setDriver(testDetails.driver);
	});

	afterEach(async () => {
		// Call tauk.upload() before you end your session
		await tauk.upload();
		await tearDown(testDetails);
	});

	it("Navigates Getting Started page", async function () {
		// Wrap the test case logic you want to monitor in tauk.observe()
		await tauk.observe(`${this.test?.title}`, async () => {
			testDetails.driver!.navigateTo("https://appium.io/")
			await clickElement(
				testDetails.driver,
				AppiumIO.HomePage.navButton
			);

			await new Promise((r) => setTimeout(r, 1000));
			await clickElement(
				testDetails.driver,
				AppiumIO.HomePage.gettingStartedButton
			);

			await new Promise((r) => setTimeout(r, 1000));
			await clickElement(
				testDetails.driver,
				AppiumIO.GettingStartedPage.installingAppiumButton
			);

			await new Promise((r) => setTimeout(r, 1000));
			await clickElement(
				testDetails.driver,
				AppiumIO.GettingStartedPage.driverSpecificSetupButton
			);

			await new Promise((r) => setTimeout(r, 1000));
			await clickElement(
				testDetails.driver,
				AppiumIO.GettingStartedPage.verifyInstallButton
			);

			await new Promise((r) => setTimeout(r, 1000));
			await clickElement(
				testDetails.driver,
				AppiumIO.GettingStartedPage.appiumClientsButton
			);

			await new Promise((r) => setTimeout(r, 1000));
			await clickElement(
				testDetails.driver,
				AppiumIO.GettingStartedPage.startingAppiumButton
			);

			await new Promise((r) => setTimeout(r, 1000));
			await clickElement(
				testDetails.driver,
				AppiumIO.GettingStartedPage.runningFirstTestButton
			);

			await new Promise((r) => setTimeout(r, 1000));
			await clickElement(
				testDetails.driver,
				AppiumIO.GettingStartedPage.whatsNextButton
			);
		});
	});
});
