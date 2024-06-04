import { expect, test } from "../pages/basePage";
import * as data from "../testData/testData.json";

test.describe("", async () => {  
  test("Login test_02", async ({ page, baseURL, loginPage, editingPage }) => {
    await page.goto(`${baseURL}auth/login`);
    await loginPage.login(data.email, data.password);
    await page.waitForTimeout(5000)
  });
 
});