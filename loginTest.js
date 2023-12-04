const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

async function loginTest() {
  let driver;
  try {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://hidden-bayou-39635-6fafc891ec3d.herokuapp.com/login');

    // Find the username and password input fields and submit button
    const usernameInput = await driver.findElement(By.name('email'));
    const passwordInput = await driver.findElement(By.name('password'));
    const submitButton = await driver.findElement(By.name('submit'));

    // Input valid credentials
    await usernameInput.sendKeys('umkc@umkc.com');
    await passwordInput.sendKeys('umkc');

    // Submit the form
    await submitButton.click();

    // Optionally, wait for a page element after login to ensure successful login
    await driver.wait(until.titleContains('Dashboard'), 5000); // Adjust as needed

    console.log('Login successful!');
  } catch (error) {
    console.error('Error during login:', error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

loginTest();
