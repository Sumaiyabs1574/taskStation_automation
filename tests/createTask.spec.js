import{test,expect} from '@playwright/test';
import{createtaskPage} from '../pages/createtaskPage';

import * as data from "../testData/testData.json";


test('createNewTask',async({page})=>{
const task =new createtaskPage(page);
await page.waitForTimeout(3000);
await task.NewTask()
await page.waitForTimeout(3000);

})