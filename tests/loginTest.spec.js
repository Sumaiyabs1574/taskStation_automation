import { expect, test } from "../pages/basePage";
import * as data from "../testData/testData.json";
import{createtaskPage} from '../pages/createtaskPage';

test.describe("Page object test demo", async () => {  
  test("Login test_02", async ({ page, baseURL, loginPage }) => {
    await page.goto(`${baseURL}auth/login`);
    await loginPage.login(data.email, data.password);
    await page.waitForTimeout(3000);
    const task =new createtaskPage(page);
    await page.waitForTimeout(3000);
await task.NewTask(data.Date,data.Name);
await task.Verifytask(data.Name);
const verifytaskname = await task.Verifytask();
await expect(verifytaskname).toBeTruthy()





  });



 
});