// class LoginPage {
//   constructor(page) {
//     this.page = page;
//   }

//   async enterEmail(email) {
//     await this.page.locator("//input[@name='email']").type(email);
//   }

//   async enterPassword(password) {
//     await this.page.locator("//input[@name='password']").type(password);
//   }

//   async clickinBtn() {
//     await this.page.click("(//button[normalize-space()='Login'])[1]");
//     await this.page.c
//   }

//   async login(email, password) {
//     await this.enterEmail(email);
//     await this.enterPassword(password);
//     await this.clickinBtn();
//   }

//   // async loadAuthenticationState() {    
//   //   const storageState = require('../storageState.json');
//   //   await this.page.context().storageState(storageState);
//   // }
// }

// module.exports = LoginPage;

