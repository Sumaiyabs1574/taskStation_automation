import { test as baseTest } from '@playwright/test';
import LoginPage from "../Pages/loginPage";
import EditingPage from "../Pages/editingPage";
import { storageState } from '@playwright/test';

const testPages = baseTest.extend({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.loadAuthenticationState(storageState);
        await use(loginPage);
    },
    editingPage: async ({ page }, use) => {
        const editingPage = new EditingPage(page);
        // await editingPage.loadAuthenticationState(storageState);
        // await use(editingPage);
    },
});

export const test = testPages;
export const expect = testPages.expect;
