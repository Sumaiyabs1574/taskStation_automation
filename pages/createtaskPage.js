exports.createtaskPage=
class createtaskPag{

constructor(page){
this.page=page;
this.addButton ="//span[normalize-space()='Add']";

this.taskName="//input[@name ='name']";
this.selectProject="//div[@id='mui-component-select-project']";
this.projectoption="//li[@role='option']";
this.selectTag="//div[@id='mui-component-select-tag']";
this.tagoption="//li[normalize-space()='Research']";

this.createButton="(//button[normalize-space()='Create'])[1]"

    }

async NewTask (Date,Name)
{
await this.page.locator(this.addButton).click();

await this.page.getByPlaceholder("DD/MM/YYYY").fill(Date);

await this.page.locator(this.taskName).fill(Name);
await this.page.waitForTimeout(3000);
await this.page.locator(this.selectProject).click();
await this.page.locator(this.projectoption).click();
await this.page.locator(this.selectTag).click();
await this.page.waitForTimeout(3000);
await this.page.locator(this.tagoption).click();
await this.page.locator(this.createButton).click();

}


}