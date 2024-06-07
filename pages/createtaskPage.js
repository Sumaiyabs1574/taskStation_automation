exports.createtaskPage=class createtaskPage{

      constructor(page){
      this.page=page;
      this.addButton ="//span[normalize-space()='Add']";
      this.taskName="//input[@name ='name']";
      this.selectProject="//div[@id='mui-component-select-project']";
      this.projectoption="//li[@role='option']";
      this.selectTag="//div[@id='mui-component-select-tag']";
      this.tagoption="//li[normalize-space()='Research']";
      this.createButton="(//button[normalize-space()='Create'])[1]";
      this.ditailsIcon="(//span[@aria-label='Details'])[1]";
      this.worklogbuton="(//button[normalize-space()='Work log'])[1]";
      this.addlogbutton="(//button[normalize-space()='Add Log'])[1]";
      this.savebutton="//span[normalize-space()='Save']";
      }
      
      async NewTask (Date,Name){
         await this.page.locator(this.addButton).click();
         await this.page.waitForTimeout(4000);
         await this.page.getByPlaceholder("DD/MM/YYYY").fill(Date);
         await this.page.waitForTimeout(2000);
         await this.page.locator(this.taskName).fill(Name);
         
         await this.page.locator(this.selectProject).click();
         await this.page.locator(this.projectoption).click();
         await this.page.locator(this.selectTag).click();
         
         await this.page.locator(this.tagoption).click();
         
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
       async verifytag(SelectTag) {
          const Nameoftag = "(//span[normalize-space()='"+SelectTag+"'])[1]";
         
      
          return await this.page.locator(Nameoftag).isVisible()
       }

       async addworklog(oldTime,oldremark) {
         await this.page.locator(this.ditailsIcon).click();
         await this.page.locator(this.worklogbuton).click();
         await this.page.locator(this.addlogbutton).click();
         await this.page.getByLabel('Total Time').click();
         await this.page.getByLabel('Total Time').fill(`${oldTime}`);
         await this.page.getByLabel('Remarks').click();
         await this.page.getByLabel('Remarks').fill(`${oldremark}`);
         await this.page.locator(this.savebutton).click();
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

             
      async  CreatTaskwithoutdate (Name){
         await this.page.locator(this.addButton).click();
         await this.page.waitForTimeout(4000);
         await this.page.locator(this.taskName).fill(Name);
         
         await this.page.locator(this.selectProject).click();
         await this.page.locator(this.projectoption).click();
         await this.page.locator(this.selectTag).click();
         
         await this.page.locator(this.tagoption).click();
         
         await this.page.locator(this.createButton).click();
         
      
      }  
   
      }