const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

async function loginTest() {
  let driver;
  try {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:3000/login');

    // Wait for the form to be present
    const loginForm = await driver.wait(until.elementLocated(By.id('student-login-form')), 5000);

    // Scroll into view
    await driver.executeScript("arguments[0].scrollIntoView(true);", loginForm);

    // Find the email input field and submit button
    const usernameInput = await loginForm.findElement(By.name('email'));
    const passwordInput = await loginForm.findElement(By.name('password'));
    const submitButton = await loginForm.findElement(By.name('submit'));

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
