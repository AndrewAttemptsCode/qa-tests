import { expect, type Page } from "@playwright/test";

class Inventory {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private getProductButton(product: string) {
    const item = this.page.getByTestId("inventory-item").filter({ has: this.page.getByTestId("inventory-item-name") }).filter({ hasText: new RegExp(product, "i") });
    return item.getByRole("button"); 
  }

  async addProductToCart(product: string) {
    const button = this.getProductButton(product);
    await expect(button).toHaveText(/add to cart/i);
    await button.click();
    return button;
  }

  async removeProductFromCart(product: string) {
    const button = this.getProductButton(product);
    await expect(button).toHaveValue(/remove/i);
    await button.click();
    return button;
  }
}

export default Inventory;
