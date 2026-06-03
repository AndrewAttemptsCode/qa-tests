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

});
