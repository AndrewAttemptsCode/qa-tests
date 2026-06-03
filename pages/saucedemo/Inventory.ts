import type { Page } from "@playwright/test";

class Inventory {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addProductToCart(product: string) {
    const selectedProduct = this.page.getByTestId("inventory-item").filter({ hasText: new RegExp(product, "i") });
    await selectedProduct.getByRole("button", { name: /add to cart/i }).click();
  }
}

export default Inventory;
