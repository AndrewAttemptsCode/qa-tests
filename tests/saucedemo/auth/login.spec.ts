import { expect } from "@playwright/test";
import { test } from "../../../test-options/saucedemo-options.js";

test.describe("Authentication", () => {
  
  test("login with valid credentials", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "secret_sauce");
    await expect(pm.page.getByText("Products")).toBeVisible();
  });

  test("display login error with invalid username", async ({ pm }) => {
    await pm.login().loginWithCredentials("invalid_user", "secret_sauce");
    await expect(pm.page.getByRole("heading", { name: /username and password do not match any user in this service/i })).toBeVisible();
  });

  test("display invalid login with invalid password", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "password123");
    await expect(pm.page.getByRole("heading", { name: /username and password do not match any user in this service/i })).toBeVisible();
  });

  test("display invalid login with invalid username and password", async ({ pm }) => {
    await pm.login().loginWithCredentials("invalid_user", "password123");
    await expect(pm.page.getByRole("heading", { name: /username and password do not match any user in this service/i })).toBeVisible();
  });

  test("display invalid login with empty username field", async ({ pm }) => {
    await pm.login().loginWithCredentials("", "secret_sauce");
    await expect(pm.page.getByRole("heading", { name: /username is required/i })).toBeVisible();
  });

  test("display invalid login with empty password field", async ({ pm }) => {
    await pm.login().loginWithCredentials("standard_user", "");
    await expect(pm.page.getByRole("heading", { name: /password is required/i })).toBeVisible();
  });

  test("display invalid login with empty username and password field", async ({ pm }) => {
    await pm.login().loginWithCredentials("", "");
    await expect(pm.page.getByRole("heading", { name: /username is required/i })).toBeVisible();
  });
});
