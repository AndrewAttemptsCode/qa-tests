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
});
