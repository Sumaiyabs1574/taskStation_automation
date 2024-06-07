const fs = require("fs");
import { test, expect } from "@playwright/test";
const ReportPage = require("../pages/reportPage");
import * as data from "../testData/testData.json";
const EditingPage = require("../pages/editingPage");
import{createtaskPage} from '../pages/createtaskPage';

let basePge;
test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(baseURL + data.loginEndPoint);
  basePge = page;
});
test.describe("TaskStation Automation-Create Task", () => {
  //create New task
  test("CreateTask", async ({ page }) => {
    const task =new createtaskPage(page);
   await task.NewTask(data.Date,data.Name);
   await expect(page.getByText('DS'), 'DS').toBeVisible();
   const verifyprojectname=await task.verifyproject(data.SelectProject);
   await expect(verifyprojectname).toBeTruthy(); 
   const verifytagkname=await task.verifytag(data.SelectTag);
   await expect(verifytagkname).toBeTruthy();
   });
 
 
   // Negative Test: Try to create Task without name and verify error message
   test("CreateTaskNeg", async ({ page }) => {
     const task2 =new createtaskPage(page);
    await task2. CreatTaskwithoutName (data.Date);
    await expect(page.getByText('Name is required'), 'Name is required').toBeVisible();
   });
 
   // Negative Test: Try to create Task without select tag and verify error message
   test("CreateTaskNeg2", async ({ page }) => {
     const task3 =new createtaskPage(page);
    await task3. CreatTaskwithouttag (data.Date,data.Name);
    await expect(page.getByText('Tag is required'), 'Tag is required').toBeVisible();
   });
 
   // Negative Test: Try to create Task without select project and verify error message
   test("CreateTaskNeg3", async ({ page }) => {
     const task4 =new createtaskPage(page);
    await task4. CreatTaskwithoutProject(data.Date,data.Name);
    await expect(page.getByText('Project is required'), 'Project is required').toBeVisible();
   });
 //verify that if user did not provide date it takes current date and create task
 test("CreateTaskNeg4", async ({ page }) => {
   const task4 =new createtaskPage(page);
  await task4. CreatTaskwithoutdate(data.Name);
 });
});

test.describe.serial("TaskStation Automation-Edit Task", () => {
  let editingPage;
  test.beforeEach("Task Edit", async ({ page, baseURL }) => {
    await page.goto(`${baseURL}auth/login`);
    editingPage = new EditingPage(page);
  });

  test("Task Edit", async ({ page }) => {
    await editingPage.clickDetail(data.taskTitle);
    await editingPage.editDetail(
      data.project,
      data.tag,
      data.description,
      data.oldTime,
      data.date,
      data.editiedTime,
      data.remark
    );
  });

  test("Todo to Complete", async ({ page }) => {
    await editingPage.clickDetail(data.taskTitle);
    await editingPage.todoToComplete(data.taskTitle);
  });

  test("Complete To Blocker", async ({ page }) => {
    await editingPage.clickDetail(data.taskTitle);
    await editingPage.completeToBlocker(data.taskTitle);
  });

  test("Blocker To Todo", async ({ page }) => {
    await editingPage.clickDetail(data.taskTitle);
    await editingPage.blockerToTodo(data.taskTitle);
  });
});
test.describe("TaskStation Automation-Report", () => {
  let reportPage;
  test.beforeEach(async ({ page }) => {
    await page.goto("https://sbueurope.mytask.today/general/my-report");
    reportPage = await new ReportPage(page);
    await reportPage.goToReportPage();
  });
  test("testDatePickerDisplaysCorrectDates", async ({}) => {
    const test_DurationData = ["06/01/2024", "06/20/2024"];
    await reportPage.setTimeDuration(
      test_DurationData[0],
      test_DurationData[1]
    );
    const get_DurationData = await reportPage.getTimeDuration();
    expect(get_DurationData).toEqual(test_DurationData);
  });
  test("testTaskAvailabilityByName", async ({ page }) => {
    const name = "report test";
    const flag_task = await reportPage.isTaskAvailable(name);
    expect(flag_task).toBeTruthy();
  });
  test("testFileDownload", async ({}) => {
    const filePath = await reportPage.downloadReport();
    expect(fs.existsSync(filePath)).toBe(true);
  });
  test("testAutoDataUpdateAndDownloadButton", async ({ page }) => {
    //await page.waitForTimeout(5000);
    await reportPage.setTimeDuration("07/07/2024", "08/07/2024");
    // await page.waitForTimeout(1000);
    expect.soft(await reportPage.isDownloadButtonEnable()).toBeFalsy();
    expect(await reportPage.web_getTotalTime()).toEqual("0m");
  });
  test("testTotalTimeEqualityBetweenWebViewAndCSV", async ({}) => {
    const filePath = await reportPage.downloadReport();
    const web_totalTimeHour = await reportPage.web_getTotalTime();
    //console.log(`Total Time Hour From Web:- ${web_totalTimeHour}`);
    const csvData = await reportPage.getReportJson(filePath);
    const csv_totalTimeHour = await reportPage.csv_getTotalTime(csvData);
    //console.log(`Total Time Hour From csv:- ${csv_totalTimeHour}`);
    expect(web_totalTimeHour).toEqual(csv_totalTimeHour);
  });
  test("testReportTableStructureBetweenWeb&CSV", async ({}) => {
    const filePath = await reportPage.downloadReport();
    const csvData = await reportPage.getReportJson(filePath);
    const tableDetails = await reportPage.getReportDetais();
    //console.log("Web:", tableDetails[0]);
    //console.log("Csv:", csvData.length);
    expect.soft(tableDetails[0]).toEqual(csvData.length);
    //description field is missed from report web view //but exist in csv file
    expect(tableDetails[1]).toEqual(Object.keys(csvData[0]).length - 1);
  });
  test("testTestDetailsEquality", async ({}) => {
    let project = "Task Station";
    let name_;
    let tag = "Learning";
    let duration = "5h ";
    const details = await reportPage.getTaskDetailsByName(name_);
    if (details) {
      expect(project).toEqual(details[0]);
      // await expect(task).toEqual(details[1]);
      expect(tag).toEqual(details[2]);
      expect(duration).toEqual(details[5]);
    }
  });
});
