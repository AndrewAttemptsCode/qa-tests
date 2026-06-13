import type { Page } from "@playwright/test";

class Checkout {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  
  async withCustomerInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.getByTestId("firstName").fill(firstName);
    await this.page.getByTestId("lastName").fill(lastName);
    await this.page.getByTestId("postalCode").fill(postalCode);

    await this.page.getByTestId("continue").click();
  }
}

export default Checkout;
