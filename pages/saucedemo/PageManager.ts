import type { Page } from "@playwright/test";
import Login from "./Login.js";

class PageManager {
  readonly page: Page;
  private readonly loginPage: Login;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new Login(this.page);
  }

  login() {
    return this.loginPage;
  }

}

export default PageManager;
