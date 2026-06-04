import type { Page } from "@playwright/test";

class Cart {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  
}

export default Cart;
