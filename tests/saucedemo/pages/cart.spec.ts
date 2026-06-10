import { expect } from "@playwright/test";
import { test } from "../../../test-options/saucedemo-options.js";

test.describe("Cart", () => {
  test("adding and removing products updates the cart item count", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "secret_sauce");
    
    await pm.inventory().addProductToCart("backpack");
    await pm.cart().assertIndicatorValue("1");

    await pm.inventory().addProductToCart("bike light");
    await pm.cart().assertIndicatorValue("2");

    await pm.inventory().removeProductFromCart("backpack");
    await pm.cart().assertIndicatorValue("1");
  });

  test("cart contains product in cart list", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "secret_sauce");
    await pm.inventory().addProductToCart("backpack");
    await pm.cart().openCart();

    const product = pm.cart().getProduct("backpack");
    await expect(product).toBeVisible();
    await expect(product).toHaveCount(1);
  });

  test("remove button, removes product from cart", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "secret_sauce");
    await pm.inventory().addProductToCart("backpack");
    await pm.cart().openCart();

    const product = await pm.cart().removeProductFromCart("backpack");
    await expect(product).not.toBeVisible();
    await expect(product).toHaveCount(0);
  });

  test("navigates back to inventory page on 'Continue Shopping' button press", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "secret_sauce");
    
    await pm.cart().openCart();
    await pm.cart().closeCart();

    await expect(pm.page.getByText("Products")).toBeVisible();
  });

  test("navigates to checkout page on 'Checkout' button press", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "secret_sauce");
    await pm.inventory().addProductToCart("backpack");
    await pm.cart().openCart();
    await pm.cart().checkout();

    await expect(pm.page.getByText(/checkout: your information/i)).toBeVisible();
  });
});
