
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
  
})