
import { test, expect } from "@playwright/test";
const LoginPage = require("../pages/loginPage");
import * as data from "../testData/testData.json";
import{createtaskPage} from '../pages/createtaskPage';
const fs = require("fs");

test.describe.serial("CreateTask", () => {
  test.beforeEach(async ({ page }) => {
    const userName = "sumaiya.habib@brainstation-23.com";
    const password = "BS1574";
    await page.goto("https://sbueurope.mytask.today/auth/login");
    const loginPage = new LoginPage(page);
    await loginPage.login(userName, password);

  })
  //create New task
  test("CreateTask", async ({ page }) => {
   const task =new createtaskPage(page);
  await task.NewTask(data.Date,data.Name);
  await expect(page.getByText('DS'), 'DS').toBeVisible();
  const verifyprojectname=await task.verifyproject(data.SelectProject);
  await expect(verifyprojectname).toBeTruthy(); 
  const verifytagkname=await task.verifytag(data.SelectTag);
  await expect(verifytagkname).toBeTruthy();
  });


  // Negative Test: Try to create Task without name and verify error message
  test("CreateTaskNeg", async ({ page }) => {
    const task2 =new createtaskPage(page);
   await task2. CreatTaskwithoutName (data.Date);
   await expect(page.getByText('Name is required'), 'Name is required').toBeVisible();
  });

  // Negative Test: Try to create Task without select tag and verify error message
  test("CreateTaskNeg2", async ({ page }) => {
    const task3 =new createtaskPage(page);
   await task3. CreatTaskwithouttag (data.Date,data.Name);
   await expect(page.getByText('Tag is required'), 'Tag is required').toBeVisible();
  });

  // Negative Test: Try to create Task without select project and verify error message
  test("CreateTaskNeg3", async ({ page }) => {
    const task4 =new createtaskPage(page);
   await task4. CreatTaskwithoutProject(data.Date,data.Name);
   await expect(page.getByText('Project is required'), 'Project is required').toBeVisible();
  });
//verify that if user did not provide date it takes current date and create task
test("CreateTaskNeg4", async ({ page }) => {
  const task4 =new createtaskPage(page);
 await task4. CreatTaskwithoutdate(data.Name);
});
})