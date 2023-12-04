const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

async function applyingTest() {
  let driver; // Declare the driver variable

  try {
    // Create a new instance of the browser
    driver = await new Builder().forBrowser('chrome').build();

    // Login
    await driver.get('https://hidden-bayou-39635-6fafc891ec3d.herokuapp.com/login');
    const usernameInput = await driver.findElement(By.name('email'));
    const passwordInput = await driver.findElement(By.name('password'));
    const submitButton = await driver.findElement(By.name('submit'));

    // Input valid credentials
    await usernameInput.sendKeys('umkc@umkc.com');
    await passwordInput.sendKeys('umkc');
    await submitButton.click();


    // Navigate to the jobs page
    await driver.get('https://hidden-bayou-39635-6fafc891ec3d.herokuapp.com/jobs');


    // Navigate to the job application page
    await driver.get('https://hidden-bayou-39635-6fafc891ec3d.herokuapp.com/apply');

    // Fill out the application form
    await driver.findElement(By.id('fName')).sendKeys('John');
    await driver.findElement(By.id('surname')).sendKeys('Doe');
    await driver.findElement(By.id('studentID')).sendKeys('123456789');
    await driver.findElement(By.id('email')).sendKeys('umkc@umkc.com');
    await driver.findElement(By.id('level')).sendKeys('Graduate');
    await driver.findElement(By.id('graduatingSemester')).sendKeys('2021');
    await driver.findElement(By.id('GPA')).sendKeys('3.5');
    await driver.findElement(By.id('hours')).sendKeys('45');
    await driver.findElement(By.id('degree')).sendKeys('Computer Science');
    await driver.findElement(By.id('major')).sendKeys('Bachelor of Science');
    await driver.findElement(By.id('applyingFor')).sendKeys('Full Time');
    await driver.findElement(By.id('GTA')).sendKeys('Yes');
    await driver.findElement(By.id('certificationTerm')).sendKeys('2020');
    await driver.findElement(By.id('previousDegree')).sendKeys('Bachelor of Science');
    await driver.findElement(By.id('courses')).sendKeys('C++');

    // Submit the form
    await driver.findElement(By.id('application-form')).submit();

    // Perform assertions or additional actions as needed

    console.log('Application submitted successfully!');
  } catch (error) {
    console.error('Error during applying:', error);
  } finally {
    // Close the browser window
    if (driver) {
      await driver.quit();
    }
  }
}

applyingTest();
