import { expect, test } from "../base/basePage";
import * as data from "../testData/testData.json";

test.beforeEach("Task Edit", async ({ page, baseURL, loginPage }) => {
    await page.goto(`${baseURL}auth/login`);
    await loginPage.login(data.email, data.password);
});

test.describe.serial("Task Station automation", async () => {
    test("Task Edit", async ({ editingPage }) => {
        await editingPage.clickDetail(data.taskTitle);
        await editingPage.editDetail(data.project, data.tag, data.description, data.oldTime, data.date, data.editiedTime, data.remark);
    });

    test("Todo to Complete", async ({ editingPage }) => {
        await editingPage.clickDetail(data.taskTitle);
        await editingPage.todoToComplete();
    });

    test("Complete To Blocker", async ({ editingPage }) => {
        await editingPage.clickDetail(data.taskTitle);
        await editingPage.completeToBlocker();
    });

    test("Blocker To Todo", async ({ editingPage }) => {
        await editingPage.clickDetail(data.taskTitle);
        await editingPage.blockerToTodo();
    });
});
