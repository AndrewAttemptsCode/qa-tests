import { expect } from "@playwright/test";
import { test } from "../../../test-options/saucedemo-options.js";
import { faker } from "@faker-js/faker";

test.describe("Checkout", () => {
  test("valid customer infomation provided", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "secret_sauce");
    await pm.inventory().addProductToCart("backpack");
    await pm.cart().openCart();
    await pm.cart().checkout();

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postalCode = faker.location.zipCode();

    await pm.checkout().withCustomerInfo(firstName, lastName, postalCode);

    await expect(pm.page.getByText(/checkout: overview/i)).toBeVisible();
  });

  test("no customer information provided returns error", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "secret_sauce");
    await pm.inventory().addProductToCart("backpack");
    await pm.cart().openCart();
    await pm.cart().checkout();

    await pm.checkout().withCustomerInfo("", "", "");

    await expect(pm.page.getByRole("heading", { name: /error: first name is required/i })).toBeVisible();
  });
});
