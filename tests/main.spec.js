import { test, expect } from "@playwright/test";
const ReportPage = require("../pages/reportPage");
const fs = require("fs");

test.describe("TaskStation Automation-Create Task", () => {});
test.describe("TaskStation Automation-Edit Task", () => {});
test.describe("TaskStation Automation-Report", () => {
  let reportPage;
  test.beforeEach(async ({ page }) => {
    await page.goto("https://sbueurope.mytask.today/general/my-report");
    reportPage = new ReportPage(page);
  });
  test("Correct Date Display for Time Duration Setup", async ({ page }) => {
    const test_DurationData = ["06/01/2024", "06/20/2024"];
    await reportPage.setTimeDuration(
      test_DurationData[0],
      test_DurationData[1]
    );
    const get_DurationData = await reportPage.getTimeDuration();
    expect(get_DurationData).toEqual(test_DurationData);
  });
  test("Asertion on task avaibility by task Name", async ({ page }) => {
    const name = "report test";
    const flag_task = await reportPage.isTaskAvailable(name);
    await page.waitForTimeout(1000);
    expect(flag_task).toBeTruthy();
  });
  test("Assertion on file downloadation", async ({}) => {
    const filePath = await reportPage.downloadReport();
    expect(fs.existsSync(filePath)).toBe(true);
  });
  test("Auto updation of data and download button enability test", async ({}) => {
    //await page.waitForTimeout(5000);
    await reportPage.setTimeDuration("07/07/2024", "08/07/2024");
    //await page.waitForTimeout(9000);
    expect(await reportPage.isDownloadButtonEnable()).toBeFalsy();
    expect.soft(await reportPage.web_getTotalTime()).toEqual("0m");
  });
  test("Validation of total time of webView and csv", async ({}) => {
    const filePath = await reportPage.downloadReport();
    const web_totalTimeHour = await reportPage.web_getTotalTime();
    //console.log(`Total Time Hour From Web:- ${web_totalTimeHour}`);
    const csvData = await reportPage.getReportJson(filePath);
    const csv_totalTimeHour = await reportPage.csv_getTotalTime(csvData);
    //console.log(`Total Time Hour From csv:- ${csv_totalTimeHour}`);
    expect(web_totalTimeHour).toEqual(csv_totalTimeHour);
  });
  test("validation of report table structure", async ({}) => {
    const filePath = await reportPage.downloadReport();
    const csvData = await reportPage.getReportJson(filePath);
    const tableDetails = await reportPage.getReportDetais();
    //console.log("Web:", tableDetails[0]);
    //console.log("Csv:", csvData.length);
    expect.soft(tableDetails[0]).toEqual(csvData.length);
    //description field is missed from report web view //but exist in csv file
    expect(tableDetails[1]).toEqual(Object.keys(csvData[0]).length - 1);
  });
  test("Validation of Test Details", async ({}) => {
    let project;
    let name_;
    let tag;
    let duration;
    const details = await reportPage.getTaskDetailsByName(name_);
    if (details) {
      expect(project).toEqual(details[0]);
      // await expect(task).toEqual(details[1]);
      expect(tag).toEqual(details[2]);
    }
  });
});
