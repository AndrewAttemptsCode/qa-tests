import { expect } from "@playwright/test";
import { test } from "../../../test-options/saucedemo-options.js";
import { faker } from "@faker-js/faker";

test.describe("Checkout", () => {
  test("valid customer information provided", async ({ pm }) => {
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

  test("omit first name field returns an error", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "secret_sauce");
    await pm.inventory().addProductToCart("backpack");
    await pm.cart().openCart();
    await pm.cart().checkout();

    const lastName = faker.person.lastName();
    const postalCode = faker.location.zipCode();

    await pm.checkout().withCustomerInfo("", lastName, postalCode);

    await expect(pm.page.getByRole("heading", { name: /error: first name is required/i })).toBeVisible();
  });

  test("omit last name field returns an error", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "secret_sauce");
    await pm.inventory().addProductToCart("backpack");
    await pm.cart().openCart();
    await pm.cart().checkout();

    const firstName = faker.person.firstName();
    const postalCode = faker.location.zipCode();

    await pm.checkout().withCustomerInfo(firstName, "", postalCode);

    await expect(pm.page.getByRole("heading", { name: /error: last name is required/i })).toBeVisible();
  });

  test("omit postal code field returns an error", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "secret_sauce");
    await pm.inventory().addProductToCart("backpack");
    await pm.cart().openCart();
    await pm.cart().checkout();

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    await pm.checkout().withCustomerInfo(firstName, lastName, "");

    await expect(pm.page.getByRole("heading", { name: /error: postal code is required/i })).toBeVisible();
  });

  test("cancel checkout from your information page returns to cart", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "secret_sauce");
    await pm.inventory().addProductToCart("backpack");
    await pm.cart().openCart();
    await pm.cart().checkout();

    await pm.checkout().abortCheckout();
    await expect(pm.page.getByText(/your cart/i)).toBeVisible();
  });

  test("complete purchase displays confirmation message", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "secret_sauce");
    await pm.inventory().addProductToCart("backpack");
    await pm.cart().openCart();
    await pm.cart().checkout();

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postalCode = faker.location.zipCode();
    await pm.checkout().withCustomerInfo(firstName, lastName, postalCode);

    await pm.checkout().completeCheckout();
    await expect(pm.page.getByText(/thank you for your order/i)).toBeVisible();
  });

  test("after purchase, 'Back Home' button navigates to inventory page", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "secret_sauce");
    await pm.inventory().addProductToCart("backpack");
    await pm.cart().openCart();
    await pm.cart().checkout();

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postalCode = faker.location.zipCode();
    await pm.checkout().withCustomerInfo(firstName, lastName, postalCode);

    await pm.checkout().completeCheckout();
    await pm.checkout().backToHome();
    
    await expect(pm.page.getByText(/products/i)).toBeVisible();
  });
});
