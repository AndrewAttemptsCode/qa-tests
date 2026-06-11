import type { Page } from "@playwright/test";

class Checkout {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  
}

export default Checkout;
