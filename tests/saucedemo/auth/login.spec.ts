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

});
