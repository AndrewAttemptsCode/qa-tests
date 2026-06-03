import type { Page } from "@playwright/test";
import Login from "./Login.js";
import Inventory from "./Inventory.js";

class PageManager {
  readonly page: Page;
  private readonly loginPage: Login;
  private readonly inventoryPage: Inventory;
  
  constructor(page: Page) {
    this.page = page;
    this.loginPage = new Login(this.page);
    this.inventoryPage = new Inventory(this.page);
  }

  login() {
    return this.loginPage;
  }

  inventory() {
    return this.inventoryPage;
  }

}

export default PageManager;
