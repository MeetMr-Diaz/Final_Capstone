const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');



async function searchTest() {
  let driver;
  try {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://hidden-bayou-39635-6fafc891ec3d.herokuapp.com/');
    await driver.findElement(By.name('title')).sendKeys('404', Key.RETURN);
    await driver.wait(until.titleContains('Lab'), 5000);
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}

searchTest();
