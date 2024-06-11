const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('https://sbueurope.mytask.today/auth/login');
  await page.fill("//input[@name='email']", 'sumaiya.habib@brainstation-23.com');
  await page.fill("//input[@name='password']", 'BS1574');
  await page.click("(//button[normalize-space()='Login'])[1]");
  await page.waitForNavigation();
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
})();
