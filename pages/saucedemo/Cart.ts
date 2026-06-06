import { expect, type Page } from "@playwright/test";

class Cart {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  
  async assertIndicatorValue(value: string) {
    const indicator = this.page.getByTestId("shopping-cart-badge");
    await expect(indicator).toHaveText(value);
  }
}

export default Cart;
