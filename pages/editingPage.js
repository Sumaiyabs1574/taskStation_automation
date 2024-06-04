const { Page } = require("@playwright/test");

class EditingPage {
  constructor(page) {
    this.page = page;
  }

  async enterEmail(email) {
    await this.page.locator("//input[@name='email']").type(email);
  }

  async enterPassword(password) {
    await this.page.locator("//input[@name='password']").type(password);
  }

  async clickinBtn() {
    await this.page.click("(//button[normalize-space()='Login'])[1]");
  }

  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickinBtn();
  }
}

module.exports = EditingPage;
