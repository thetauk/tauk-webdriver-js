# Tauk WebdriverIO Package for JavaScript and TypeScript

## Installation
```bash
$ npm install --save-dev  @tauk.com/tauk
```

## Usage

### Import the Tauk package in your test suite. 

```js
import Tauk from "@tauk.com/tauk"
```

### Instantiate Tauk with your `API TOKEN` and `PROJECT ID` from the Tauk Web UI.

```js
const tauk: Tauk = new Tauk("API-TOKEN", "PROJECT-ID");
```
If you want to exclude a test suite from analysis you can pass in the parameter`{ excluded: true }`. For example:
```js
const tauk: Tauk = new Tauk("API-TOKEN", "PROJECT-ID", { excluded: true } );
```

### Provide Tauk with a reference to your driver object.

```js
tauk.setDriver(driver);
```

### Wrap your individual test cases in `tauk.observe()`.
The first parameter is the test case name as a string. The second parameter is your test case function. For example:
```js
  await tauk.observe("Add new contact", async () => {
    await (await driver.$(`android=${AndroidContacts.locators.firstNameTextField}`)).setValue("Tauk");
    await (await driver.$(`android=${AndroidContacts.locators.lastNameTextField}`)).setValue("Samples");
    await (await driver.$(AndroidContacts.locators.saveButton)).click();
  });
```

### Call `tauk.upload()` before ending your driver session.

```js
await tauk.upload();
```


### Recommendations for use in BDD-style test suites
When using the Tauk package in BDD-style test suites, such as Mocha and Jasmine, here are some recommendations:
- Instantiate Tauk within the `describe()` hook.
- Set the driver object in the `before()` hook.
- Use `tauk.observe()` in each of your `it()` hooks.
- Call `tauk.upload()` before ending your driver session in your `after()` hook.

For example:
```js
describe('Android Contacts App Test', function () {
  ...
  const tauk: Tauk = new Tauk("API-TOKEN", "PROJECT-ID");

  before(async function () {
    ...
    tauk.setDriver(driver);
  });

  it('Add new contact', async function () {
    await tauk.observe(`${this.test?.title}`, async () => {
      // Your test case logic
    });
  });

  after(async function () {
    ...
    await tauk.upload(); // Invoke right before ending the session
    await driver.deleteSession();
  });
});
```

*For the full source of this example, please take a look at the `androidContacts.ts` test case in the `tests` directory of the repository.*
