import { expect } from "@playwright/test";

export default class EditingPage {
  constructor(page) {
    this.page = page;
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
    expect(textContent).toBe(`${project}`);

    // Select tag and assert right tag is selected
    await this.page.click("(//div[@id='task-view-modal-project'])[2]");
    await this.page.click(`//li[normalize-space()='${tag}']`);
    await this.page.locator('#task-view-modal-projectchipMenu div').first().click();
    const elementHandle01 = await this.page.$(`//div[@id="task-view-modal-project"]//span[@class="MuiChip-label MuiChip-labelSmall css-tavflp"][normalize-space()="${tag}"]`);
    const textContent01 = await elementHandle01?.textContent();
    expect(textContent01).toBe(`${tag}`);

    // Write description and assert description is updated
    await this.page.getByRole('paragraph').click();
    await this.page.locator('.jodit-wysiwyg').fill(`${description}`);
    await this.page.getByRole('button', { name: 'Save' }).click();   
    await expect(this.page.getByText('Description added')).toBeVisible();
    await expect(this.page.getByRole('paragraph')).toContainText(`${description}`);

    // Update worklog time and date and assert date and time is updated
    await this.page.getByRole('tab', { name: 'Work log' }).click();
    await this.page.click(`//span[normalize-space()='${oldTime}']`);
    await this.page.fill("//input[@placeholder='DD/MM/YYYY']", `${date}`);
    await this.page.getByLabel('Total Time').click();
    await this.page.getByLabel('Total Time').fill(`${editiedTime}`);
    await this.page.getByLabel('Remarks').click();
    await this.page.getByLabel('Remarks').fill(`${remark}`);
    await this.page.getByRole('button', { name: 'Edit' }).click();
    await expect(this.page.getByText('Log Edited')).toBeVisible();
    const elementHandle02 = await this.page.locator(`//span[normalize-space()='${editiedTime}']`);
    const textContent02 = await elementHandle02.textContent();
    expect(textContent02).toBe(editiedTime);
    const reversedDate = date.split('/').reverse().join('-');
    const elementHandle03 = await this.page.locator(`//span[normalize-space()='${editiedTime}']/../preceding-sibling::*//p[normalize-space()='${reversedDate}']`);
    const textContent03 = await elementHandle03?.textContent();
    expect(textContent03).toBe(reversedDate);
    await this.page.getByRole('button', { name: 'Close' }).click();

    await this.page.waitForTimeout(3000);
  }
}
