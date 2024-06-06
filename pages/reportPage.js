import csv from "csvtojson";
import path from "path";

class ReportPage {
  constructor(page) {
    this.page = page;
    this.loc_btnDownload = "//div[@id='page-actions']/div/span/button";
    this.loc_totalWorkHour = "//button[@aria-label='info']/../span";
    this.loc_startDate = "(//input[@placeholder='MM/DD/YYYY'])[1]";
    this.loc_endDate = "(//input[@placeholder='MM/DD/YYYY'])[2]"; //input[@placeholder='MM/DD/YYYY'][2]";
    this.loc_reportContainer = "//div[@class='MuiBox-root css-cqbqlk']";
  }

  async navigateToReportPage() {
    await this.page.goto("https://sbueurope.mytask.today/general/my-report");
    await this.page.waitForURL(
      "https://sbueurope.mytask.today/general/my-report"
    );
  }
  async goToReportPage() {
    await this.page.click(
      "//span[@class='ps-menu-label ps-active css-12w9als']"
    );
    await this.page.waitForURL(
      "https://sbueurope.mytask.today/general/my-report"
    );
  }

  async downloadReport() {
    if (this.isDownloadButtonEnable) {
      console.log("in downloadReport if section");
      const downloadPromise = this.page.waitForEvent("download");
      await this.page.locator(this.loc_btnDownload).click();
      const download = await downloadPromise;
      const filepath = "test-results/" + (await download.suggestedFilename());
      await download.saveAs(filepath);
      return filepath;
    }
    throw new Error(
      "Download button is disable.Possibly Wrong time selection!"
    );
  }
  async setTimeDuration(startDate, endDate) {
    await this.page.waitForTimeout(1000);
    await this.page.waitForLoadState();
    await this.page.getByPlaceholder("MM/DD/YYYY").first().fill(startDate);
    await this.page.waitForLoadState();
    await this.page.getByPlaceholder("MM/DD/YYYY").nth(1).fill(endDate);
    await this.page.waitForTimeout(1000);
  }
  async getTimeDuration() {
    const startDate = await this.page
      .locator(this.loc_startDate)
      .getAttribute("value");
    const endDate = await this.page
      .locator(this.loc_endDate)
      .getAttribute("value");
    return [startDate, endDate];
  }
  async web_getTotalTime() {
    await this.page.waitForTimeout(500);
    const time_ = (
      await this.page.locator(this.loc_totalWorkHour).textContent()
    )
      .split(":")[1]
      .trim();
    return time_;
  }
  async isTaskAvailable(name) {
    const tasks =
      "//div[@class='MuiDataGrid-virtualScroller css-frlfct']/div/div/div/div";
    const taskNames = tasks + "[@data-field='task']/div[text()='" + name + "']";
    const check =
      "//div[@class='MuiDataGrid-virtualScroller css-frlfct']/div/div/div/div[@data-field='task']/div[text()='report test']";
    await this.page.waitForSelector(check);
    console.log("elements:", await this.page.locator(taskNames).count());
    if ((await this.page.locator(check).count()) > 0) {
      return true;
    } else {
      return false;
    }
  }
  async getReportJson(filepath) {
    const csvFilePath = await path.resolve(filepath);
    const jsonContent = await csv().fromFile(csvFilePath);
    return jsonContent;
  }
  async csv_getTotalTime(content) {
    let hour = 0;
    let minute = 0;
    let day = 0;
    if (content) {
      for (let row of content) {
        const splitted = row.Duration.split(" ");
        for (let part of splitted) {
          if (part.includes("d")) {
            day += this.getdigitFromString(part);
          } else if (part.includes("h")) {
            hour += this.getdigitFromString(part);
          } else if (part.includes("m")) {
            minute += this.getdigitFromString(part);
          }
        }
      }
      if (minute > 60) {
        hour += Math.floor(minute / 60);
        minute = minute % 60;
      }
      if (hour > 8) {
        day += Math.floor(hour / 8);
        hour = hour % 8;
      }
    }
    let fhour = hour > 0 ? `${hour}h` : "";
    let fday = day > 0 ? `${day}d` : "";
    let fmin = minute > 0 ? `${minute}m` : "";
    let total_time;
    if (hour > 0) {
      total_time = `${fday} ${fhour} ${fmin}`;
    } else {
      total_time = `${fday} ${fmin}`;
    }
    return total_time.trim();
  }
  async isDownloadButtonEnable() {
    await this.page.waitForLoadState();
    return this.page.locator(this.loc_btnDownload).isEnabled();
  }
  async getReportDetais() {
    const rowContainer = await this.page.getByRole("rowgroup").nth(1);
    console.log("report rows:", await rowContainer.count());

    // const element_rows = await rowContainer.getByRole("row").all();
    const rowsNumber = await this.page.locator("//div[@role='row']").count();
    const rowsNumber_ = await this.page.locator("//div[@role='row']"); //.count();
    const status = await rowContainer
      .locator("//div/div[@data-field='task']")
      .all();
    for (let i = 0; i < status.length; i++) {
      console.log(`Row ${i}`, await status[i].textContent());
    }
    console.log("report rows:", await rowsNumber_.count());
    const columnNumber = await (await this.page.getByRole("rowgroup").first())
      .locator("//div[@role='row']/div")
      .count();
    return [status.length, columnNumber];
  }
  async getTaskDetailsByName(name) {
    const name = "test01";
    const parent_ele = await this.page.locator(
      "//div[text()='" + name + "']/ancestor::div[@role='row']"
    );
    if (parent_ele.isVisible()) {
      const project = await parent_ele
        .locator("/div[@data-field='project']/div")
        .textContent();
      const task = name;
      const tag = await parent_ele
        .locator("/div[@data-field='tags']/div")
        .textContent();
      const start_at = await parent_ele
        .locator("/div[@data-field='start_at']/div")
        .textContent();
      const end_at = await parent_ele
        .locator("/div[@data-field='stop_at']/div")
        .textContent();
      const duration = await parent_ele
        .locator("/div[@data-field='duration']/div")
        .textContent();

      return [project, task, tag, start_at, end_at, duration];
    } else {
      return null;
    }
  }

  getdigitFromString(string_) {
    const match = string_.match(/\d+/);
    return Number(match);
  }
}

module.exports = ReportPage;

/* 
const taskProjects = tasks + "[@data-field='project']";
const taskDuration = tasks + "[@data-field='duration']";
const tasktags = tasks + "[@data-field='duration']";
*/
