import { expect } from "@playwright/test";
import { test } from "../../../test-options/saucedemo-options.js";

test.describe("Inventory", () => {
  test("add product to cart button updates state", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "secret_sauce");
    const button = await pm.inventory().addProductToCart("backpack");

    await expect(button).toHaveText(/remove/i);
  });

});
