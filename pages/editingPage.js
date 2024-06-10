const { Page,expect } = require("@playwright/test");
 class EditingPage {
  constructor(page) {
    this.page = page;
  }
  async loadAuthenticationState(storageState) {
    // Load authentication state from storageState.json
    await this.page.context().storageState(storageState);
  }
  async clickDetail(taskTitle) {
    await this.page.click(`//h5[contains(text(),'${taskTitle}')]/following-sibling::div[@class='MuiStack-root css-l256j9']/span[@aria-label='Details']`);
  }

  async editDetail(project, tag, description, oldTime, date, editiedTime, remark) {

    // Select project and assert right project is selected
    await this.page.click("(//div[@id='task-view-modal-project'])[1]");
    await this.page.click(`//li[contains(text(),'${project}')]`);
    await this.page.locator('#task-view-modal-projectchipMenu div').first().click();
    const elementHandle = await this.page.$(`//div[@id="task-view-modal-project"]//span[@class="MuiChip-label MuiChip-labelSmall css-tavflp"][normalize-space()="${project}"]`);
    const textContent = await elementHandle?.textContent();
    expect.soft(textContent).toBe(`${project}`);

    // Select tag and assert right tag is selected
    await this.page.click("(//div[@id='task-view-modal-project'])[2]");
    await this.page.click(`//li[normalize-space()='${tag}']`);
    await this.page.locator('#task-view-modal-projectchipMenu div').first().click();
    const elementHandle01 = await this.page.locator(`//div[@id="task-view-modal-project"]//span[@class="MuiChip-label MuiChip-labelSmall css-tavflp"][normalize-space()="${tag}"]`);
    const textContent01 = await elementHandle01?.textContent();
    expect.soft(textContent01).toBe(`${tag}`);

    // Write description and assert description is updated
    await this.page.getByRole('paragraph').click();
    await this.page.locator('.jodit-wysiwyg').fill(`${description}`);
    await this.page.getByRole('button', { name: 'Save' }).click();   
    await expect.soft(this.page.getByText('Description added')).toBeVisible();
    await expect.soft(this.page.locator("//div[@class='jodit-wysiwyg']")).toContainText(`${description}`);

    // Update worklog time and date and assert date and time is updated
    await this.page.getByRole('tab', { name: 'Work log' }).click();
    await this.page.click(`//span[@class='MuiBox-root css-1scpmm7' and text()='${oldTime}']`);
    await this.page.fill("//input[@placeholder='DD/MM/YYYY']", `${date}`);
    await this.page.getByLabel('Total Time').click();
    await this.page.getByLabel('Total Time').fill(`${editiedTime}`);
    await this.page.getByLabel('Remarks').click();
    await this.page.getByLabel('Remarks').fill(`${remark}`);
    await this.page.getByRole('button', { name: 'Edit' }).click();
    await expect.soft(this.page.getByText('Log Edited')).toBeVisible();
    const elementHandle02 = await this.page.locator(`//span[@class='MuiBox-root css-1scpmm7' and text()='${editiedTime}']`);
    const textContent02 = await elementHandle02.textContent();
    expect.soft(textContent02).toBe(editiedTime);
    const reversedDate = date.split('/').reverse().join('-');
    const elementHandle03 = await this.page.locator(`//span[@class='MuiBox-root css-1scpmm7' and text()='${editiedTime}']/../preceding-sibling::*//p[normalize-space()='${reversedDate}']`);
    const textContent03 = await elementHandle03?.textContent();
    expect.soft(textContent03).toBe(reversedDate);
    await this.page.getByRole('button', { name: 'Close' }).click();

    await this.page.waitForTimeout(3000);
  }

  async todoToComplete(taskTitle) {
    await this.page.getByLabel('more').click();
    await this.page.getByRole('menuitem', { name: 'Completed' }).click();
    await this.page.locator('#three-dots-menu div').first().click();
    await this.page.getByRole('button', { name: 'Close' }).click();
    const elementHandle = await this.page.$(`//h5[normalize-space()='${taskTitle}']/ancestor::*[@class="MuiStack-root css-mmtdxd"]`);
    const idValue = await elementHandle?.getAttribute('id');
    expect.soft(idValue).toBe('done-drop-point');
  }

  async completeToBlocker(taskTitle) {
    await this.page.getByLabel('more').click();
    await this.page.getByRole('menuitem', { name: 'Blocker' }).click();
    await this.page.locator('#three-dots-menu div').first().click();
    await this.page.getByRole('button', { name: 'Close' }).click();
    const elementHandle = await this.page.$(`//h5[normalize-space()='${taskTitle}']/ancestor::*[@class="MuiStack-root css-mmtdxd"]`);
    const idValue = await elementHandle?.getAttribute('id');
    expect.soft(idValue).toBe('blocked-drop-point');
  }

  async blockerToTodo(taskTitle) {
    await this.page.getByLabel('more').click();
    await this.page.getByRole('menuitem', { name: 'TODO' }).click();
    await this.page.locator('#three-dots-menu div').first().click();
    await this.page.getByRole('button', { name: 'Close' }).click();
    const elementHandle = await this.page.$(`//h5[normalize-space()='${taskTitle}']/ancestor::*[@class="MuiStack-root css-mmtdxd"]`);
    const idValue = await elementHandle?.getAttribute('id');
    expect.soft(idValue).toBe('to_do-drop-point');
  }
}
module.exports = EditingPage;