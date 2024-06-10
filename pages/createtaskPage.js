exports.createtaskPage=class createtaskPage{

      constructor(page){
      this.page=page;
      this.addButton ="//span[normalize-space()='Add']";
      this.taskName="//input[@name ='name']";
      this.selectProject="//div[@id='mui-component-select-project']";
      this.projectoption="(//li[@role='option'])[1]";
      this.selectTag="//div[@id='mui-component-select-tag']";
      
      this.createButton="(//button[normalize-space()='Create'])[1]";
      this.ditailsIcon="body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > main:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(2) > button:nth-child(1)";
      this.worklogbuton="(//button[normalize-space()='Work log'])[1]";
      this.addlogbutton="(//button[normalize-space()='Add Log'])[1]";
      this.addlogbutton2="span[aria-label='Add new'] button"
      this.savebutton="//span[normalize-space()='Save']";
      this.Timmeline="(//button[normalize-space()='Timeline'])[1]";
      this.close="body > div:nth-child(26) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > button:nth-child(1)";
      }
      
      async NewTask (Name,SelectProjec,SelectTag){
         await this.page.locator(this.addButton).click();
         await this.page.waitForTimeout(2000);
         await this.page.locator(this.taskName).fill(Name);
         await this.page.locator(this.selectProject).click();
         await this.page.waitForTimeout(2000);
         await this.page.locator(this.projectoption).click();
         await this.page.locator(this.selectTag).click();
         await this.page.locator(this.tagoption="//li[normalize-space()='"+SelectTag+"']").click();
   
         await this.page.locator(this.createButton).click();
         
      
      }
      
      async verifytaskn(Name) {
          const Nameoftask = "//h5[normalize-space()='"+Name+"']";
         
          return await this.page.locator(Nameoftask ).isVisible()
       }
      
       async verifyproject(SelectProject) {
          const NameofProject = "(//span[normalize-space()='"+SelectProject+"'])[1]";
       
          return await this.page.locator(NameofProject).isVisible()
       }
   

       async addworklog(oldTime,oldremark) {
         await this.page.waitForTimeout(1000);
         await this.page.locator(this.ditailsIcon).click();
         await this.page.locator(this.worklogbuton).click();
         if (this.page.locator(this.addlogbutton).isVisible()) {
           await this.page.locator(this.addlogbutton).click();
           await this.page.waitForLoadState();
         } else {
           await this.page.locator(this.addlogbutton2).click();
           await this.page.waitForLoadState();
         }
      
         await this.page.getByLabel("Total Time").click();
         await this.page.waitForTimeout(1000);
         await this.page.getByLabel("Total Time").fill(`${oldTime}`);
         await this.page.waitForTimeout(1000);
         await this.page.getByLabel("Remarks").click();
         await this.page.getByLabel("Remarks").fill(`${oldremark}`);
         await this.page.waitForTimeout(3000);
         if (this.page.locator(this.savebutton).isVisible()) {
           await this.page.locator(this.savebutton).scrollIntoViewIfNeeded();
           await this.page.locator(this.savebutton).click();
           console.log("Save button clicked");
           await this.page.locator("(//button[normalize-space()='Close'])[1]").click();
         } else {
           throw new Error("Save button is not found ");
         }
         //  await this.page
         //    .locator(this.addlogWindowCloseButton)
         //    .scrollIntoViewIfNeeded();
         //  await this.page.locator(this.addlogWindowCloseButton).click();
         await this.page.reload();
         await this.page.waitForTimeout(5000);
         await this.page.reload();
         await this.page.waitForTimeout(5000);
       }
       
      
   
       async CreatTaskwithoutName (Date){
         await this.page.locator(this.addButton).click();
         await this.page.waitForTimeout(4000);
         await this.page.getByPlaceholder("DD/MM/YYYY").fill(Date);
         await this.page.locator(this.selectProject).click();
         await this.page.waitForTimeout(2000);
         await this.page.locator(this.projectoption).click();
         await this.page.locator(this.selectTag).click();
         await this.page.waitForTimeout(2000);
         await this.page.locator(this.tagoption).click();
         await this.page.waitForTimeout(3000);
         await this.page.locator(this.createButton).click();
         await this.page.waitForTimeout(3000);
         }
   
   
        async CreatTaskwithouttag (Date,Name){
            await this.page.locator(this.addButton).click();
            await this.page.waitForTimeout(4000);
            await this.page.getByPlaceholder("DD/MM/YYYY").fill(Date);
            await this.page.locator(this.taskName).fill(Name);
            await this.page.locator(this.selectProject).click();
            await this.page.locator(this.projectoption).click();
            await this.page.locator(this.createButton).click();
            
            }
   
            async CreatTaskwithoutProject(Date,Name){
               await this.page.locator(this.addButton).click();
               await this.page.waitForTimeout(4000);
               await this.page.getByPlaceholder("DD/MM/YYYY").fill(Date);
               await this.page.waitForTimeout(2000);
               await this.page.locator(this.taskName).fill(Name);
               await this.page.locator(this.selectTag).click();
               await this.page.locator(this.tagoption).click();
               await this.page.locator(this.createButton).click();
               
               }

             
      async  CreatTaskwithdate (Name,Date){
         await this.page.locator(this.addButton).click();
         await this.page.waitForTimeout(4000);
         await this.page.locator(this.taskName).fill(Name);
         await this.page.getByPlaceholder("DD/MM/YYYY").fill(Date);
         await this.page.locator(this.selectProject).click();
         await this.page.locator(this.projectoption).click();
         await this.page.locator(this.selectTag).click();
         
         await this.page.locator(this.tagoption).click();
         
         await this.page.locator(this.createButton).click();
         
      
      }  

      async NewTaskWithTimeline (Date,Name){
         await this.page.locator(this.addButton).click();
         await this.page.waitForTimeout(4000);
         await this.page.getByPlaceholder("DD/MM/YYYY").fill(Date);
         await this.page.waitForTimeout(2000);
         await this.page.locator(this.taskName).fill(Name);
         
         await this.page.locator(this.selectProject).click();
         await this.page.locator(this.projectoption).click();
         await this.page.locator(this.selectTag).click();
         
         await this.page.locator(this.tagoption).click();
         await this.page.locator(this.tagoption).click();
         await this.page.locator(this.Timmeline).click();
         await this.page.locator(this.createButton).click();
         
      
      }
   
      }