import { expect, test } from "../pages/basePage";
import * as data from "../testData/testData.json";
import{createtaskPage} from '../pages/createtaskPage';

test.describe("Page object test demo", async () => {  
  test("Login test_02", async ({ baseURL, loginPage }) => {
    await page.goto(`${baseURL}auth/login`);
    await loginPage.login(data.email, data.password);
      await page.waitForTimeout(3000);
     
     
  //  const task =new createtaskPage(page);
  //     await page.waitForTimeout(3000);
  // await task.NewTask(data.Date,data.Name);

  // const verifytaskname = await task.verifytaskn(data.Name);
  // await expect(verifytaskname).toBeTruthy();

  // const verifyprojectname=await task.verifyproject(data.SelectProject);
  // await expect(verifyprojectname).toBeTruthy(); 

  // const verifytagkname=await task.verifytag(data.SelectTag);
  // await expect(verifytagkname).toBeTruthy();




  });



})