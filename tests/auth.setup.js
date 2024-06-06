import { test as setup } from "@playwright/test";
const authFile = "testData/.authentication/auth.json";
import * as data from "../testData/testData.json";

setup("authenticate", async ({ page, baseURL }) => {
  let emailSelector = "//input[@name='email']";
  let passwordSelector = "//input[@name='password']";
  let loginButtonSelector = "(//button[normalize-space()='Login'])[1]";
  const loginUrl = baseURL + data.loginEndPoint;

  console.log("Navigating to login URL:", loginUrl);
  await page.goto(loginUrl);
  await page.waitForLoadState();
  await page.locator(emailSelector).fill(data.email);
  await page.locator(passwordSelector).fill(data.password);
  await page.click(loginButtonSelector);
  await page.waitForLoadState();
  await page.waitForTimeout(5000);

  // Save authentication state
  await page.context().storageState({ path: authFile });
});
