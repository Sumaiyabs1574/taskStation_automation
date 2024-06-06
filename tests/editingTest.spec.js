import { expect, test } from "../base/basePage";
import * as data from "../testData/testData.json";

test.describe("Task Station automation", () => {  
    test("Task Edit", async ({ page, baseURL, loginPage, editingPage }) => {
        await page.goto(`${baseURL}auth/login`);
        await loginPage.login(data.email, data.password);
        await editingPage.clickDetail(data.taskTitle);
        await editingPage.editDetail(data.project, data.tag, data.description, data.oldTime, data.date, data.editiedTime, data.remark);
    });
});
