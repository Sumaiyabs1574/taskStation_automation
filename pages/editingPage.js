const { Page } = require("@playwright/test");


 class EditingPage {
  constructor(page) {
    this.page = page
  }

  async clickDetail(taskTitle) {
    await this.page.click(`//h5[contains(text(),${taskTitle})]/following-sibling::div[@class='MuiStack-root css-l256j9']/span[@aria-label='Details']`);
    }

    async editDetail(){
        await this.page.click("(//div[@id='task-view-modal-project'])[1]")
        await this.page.click("(//li[@role='menuitem'])[1]")
        await this.page.locator('#task-view-modal-projectchipMenu div').first().click();
        await this.page.click("(//div[@id='task-view-modal-project'])[2]");
        await this.page.locator("(//li[normalize-space()='Learning'])[1]").click();
        await this.page.locator('#task-view-modal-projectchipMenu div').first().click();
        await this.page.waitForTimeout(5000)


        await this.page.reload()


    }
}

module.exports = EditingPage;

