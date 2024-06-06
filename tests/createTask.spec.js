
import { test, expect } from "@playwright/test";
const LoginPage = require("../pages/loginPage");
import * as data from "../testData/testData.json";
import{createtaskPage} from '../pages/createtaskPage';
const fs = require("fs");

test.describe("CreateTask", () => {
  test.beforeEach(async ({ page }) => {
    const userName = "sumaiya.habib@brainstation-23.com";
    const password = "BS1574";
    await page.goto("https://sbueurope.mytask.today/auth/login");
    const loginPage = new LoginPage(page);
    await loginPage.login(userName, password);
   const task =new createtaskPage(page);
  await task.NewTask(data.Date,data.Name);

  const verifytaskname = await task.verifytaskn(data.Name);
  await expect(verifytaskname).toBeTruthy();

  const verifyprojectname=await task.verifyproject(data.SelectProject);
  await expect(verifyprojectname).toBeTruthy(); 

  const verifytagkname=await task.verifytag(data.SelectTag);
  await expect(verifytagkname).toBeTruthy();

  });

  test("CreateTaskNeg", async ({ page }) => {
    const task2 =new createtaskPage(page);
   await task2. CreatTaskwithoutName (data.Date);
   await expect(page.getByText('Name is required'), 'Name is required').toBeVisible();
  });


})