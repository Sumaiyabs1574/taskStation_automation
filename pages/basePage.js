const { test: baseTest } = require('@playwright/test');
const LoginPage = require('./loginPage');

const testPages = baseTest.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
});

const test = testPages;
const expect = testPages.expect;

module.exports = { test, expect };