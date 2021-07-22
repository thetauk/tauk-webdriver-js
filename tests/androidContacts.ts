import { remote, RemoteOptions, Browser } from "webdriverio";
import ProjectCapabilities from "./projectCapabilities";
import AndroidContacts from "./viewObjects/androidContacts";
import Tauk from "../src/tauk"; // Import the Tauk package


describe('Android Contacts App Test', function () {
  let driver: Browser<"async">;
  this.timeout(40000);

  // Create an instance of the Tauk class and provide your API TOKEN and PROJECT ID
  const tauk: Tauk = new Tauk("API-TOKEN", "PROJECT-ID");

  before(async function () {
    const remoteOptions: RemoteOptions = ProjectCapabilities.androidBaseCapabilities(
      "com.android.contacts",
      "com.android.contacts.activities.PeopleActivity",
      {
        noReset: true
      }
    );
    driver = await remote(remoteOptions);
    // Provide your driver object 
    tauk.setDriver(driver);
  });

  it('Add new contact', async function () {
    // Wrap the test case logic you want to monitor in tauk.observe()
    await tauk.observe(`${this.test?.title}`, async () => {

      if ((await driver.$(AndroidContacts.locators.floatingActionButton))
        .waitForExist({ timeout: 5000 })) {
        await (await driver.$(AndroidContacts.locators.floatingActionButton)).click();
      }

      await (await driver.$(`android=${AndroidContacts.locators.firstNameTextField}`)).setValue("Tauk");
      await (await driver.$(`android=${AndroidContacts.locators.lastNameTextField}`)).setValue("Samples");
      await (await driver.$(AndroidContacts.locators.saveButton)).click();

      if ((await driver.$(`android=${AndroidContacts.locators.moreOptionsMenuButon}`))
        .waitForExist({ timeout: 3000 })) {
        await (await driver.$(`android=${AndroidContacts.locators.moreOptionsMenuButon}`)).click();
      }

      await (await driver.$(`android=${AndroidContacts.locators.moreOptionsMenuDeleteButton}`)).click();


      if ((await driver.$(`android=${AndroidContacts.locators.deleteContactConfirmationButton}`))
        .waitForExist({ timeout: 3000 })) {
        await (await driver.$(`android=${AndroidContacts.locators.deleteContactConfirmationButton}`)).click();
      }
    });
  });

  after(async function () {
    const allCapabilities: any = driver.capabilities;
    const desiredCapabilities = allCapabilities.desired;
    console.log(desiredCapabilities);
    // Call tauk.upload() before you end your session
    await tauk.upload();
    await driver.deleteSession();
  });

});