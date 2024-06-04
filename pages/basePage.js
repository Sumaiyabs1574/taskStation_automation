const { test: baseTest } = require('@playwright/test');
const LoginPage = require('./loginPage');
const EditingPage = require('./editingPage');



const testPages = baseTest.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    editingPage: async({page},use)=>{
        await use(new EditingPage(page));
    }
});

const test = testPages;
const expect = testPages.expect;

module.exports = { test, expect };