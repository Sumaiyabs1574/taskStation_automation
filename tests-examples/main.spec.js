import { test, expect } from "@playwright/test";

test("auth test", async ({ page }) => {
  page.goto("https://sbueurope.mytask.today/general/my-task");
  await page.waitForLoadState();
  await page.getByRole("link", { name: "Report" }).click();
  await page.getByPlaceholder("MM/DD/YYYY").first().click();
  await page.getByRole("link", { name: "ERP" }).click();
  await page.getByRole("link", { name: "Jira" }).click();
  await page.getByRole("link", { name: "Azure" }).click();
  await page.getByRole("link", { name: "ERP" }).click();
  await page.getByRole("link", { name: "Report" }).click();
  await page.getByRole("link", { name: "My Tasks" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^task to edit$/ })
    .getByLabel("Details")
    .getByLabel("icon-button")
    .click();
});
