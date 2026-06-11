import type { Page } from "@playwright/test";
import Login from "./Login.js";
import Inventory from "./Inventory.js";
import Cart from "./Cart.js";
import Checkout from "./Checkout.js";

class PageManager {
  readonly page: Page;
  private readonly loginPage: Login;
  private readonly inventoryPage: Inventory;
  private readonly cartPage: Cart;
  private readonly checkoutPage: Checkout;
  
  constructor(page: Page) {
    this.page = page;
    this.loginPage = new Login(this.page);
    this.inventoryPage = new Inventory(this.page);
    this.cartPage = new Cart(this.page);
    this.checkoutPage = new Checkout(this.page);
  }

  login() {
    return this.loginPage;
  }

  inventory() {
    return this.inventoryPage;
  }

  cart() {
    return this.cartPage;
  }

  checkout() {
    return this.checkoutPage;
  }

}

export default PageManager;
