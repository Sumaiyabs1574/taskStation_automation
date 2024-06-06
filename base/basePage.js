import { test as baseTest } from '@playwright/test';
import LoginPage from "../Pages/loginPage";
import EditingPage from "../Pages/editingPage";

const testPages = baseTest.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    editingPage: async ({ page }, use) => {
        await use(new EditingPage(page));
    },
});

export const test = testPages;
export const expect = testPages.expect;
