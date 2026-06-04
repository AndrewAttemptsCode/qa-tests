import { expect } from "@playwright/test";
import { test } from "../../../test-options/saucedemo-options.js";

test.describe("Inventory", () => {
  test("add product to cart button updates state", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "secret_sauce");
    const button = await pm.inventory().addProductToCart("backpack");

    await expect(button).toHaveText(/remove/i);
  });

  test("remove product from cart button updates state", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "secret_sauce");
    await pm.inventory().addProductToCart("backpack");

    const button = await pm.inventory().removeProductFromCart("backpack");

    await expect(button).toHaveText(/add to cart/i);
  });

  test("add multiple products to cart, updates button states", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "secret_sauce");
    const product1 = await pm.inventory().addProductToCart("backpack");
    const product2 = await pm.inventory().addProductToCart("bike light");
    const product3 = await pm.inventory().addProductToCart("onesie");

    const products = [product1, product2, product3];

    for (const product of products) {
      await expect(product).toHaveText(/remove/i);
    }
  });

});
