import { expect, test } from "../base/basePage";
import * as data from "../testData/testData.json";

test.describe("Page object test demo", async () => {  
  test("Login test_02", async ({ page, baseURL, loginPage }) => {
    await page.goto(`${baseURL}auth/login`);
    await loginPage.login(data.email, data.password);
    await page.waitForTimeout(5000)
  });
 
});