import { remote, RemoteOptions, Browser } from "webdriverio";
import dotenv from "dotenv";
import ProjectCapabilities from "./projectCapabilities";
import AndroidContacts from "./viewObjects/androidContacts";
import Tauk from "../dist/tauk";


describe('Android Contacts App Test', function () {
  let driver: Browser<"async">;
  this.timeout(40000);

  dotenv.config();
  const tauk: Tauk = new Tauk(`${process.env.API_TOKEN}`, `${process.env.PROJECT_ID}`);

  before(async function () {
    const remoteOptions: RemoteOptions = ProjectCapabilities.androidBaseCapabilities(
      "com.android.contacts",
      "com.android.contacts.activities.PeopleActivity",
      {
        noReset: true
      }
    );
    driver = await remote(remoteOptions);
    tauk.setDriver(driver);
  });

  it('Add new contact', async function () {
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
    await tauk.upload();
    await driver.deleteSession();
  });

});