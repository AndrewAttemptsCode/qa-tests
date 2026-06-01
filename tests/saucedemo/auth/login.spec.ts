import { expect } from "@playwright/test";
import { test } from "../../../test-options/saucedemo-options.js";

test.describe("Authentication", () => {
  
  test("login with valid credentials", async ({ pm }) => {
    await pm.login().loginWithUsername();
    await expect(pm.page.getByText("Products")).toBeVisible();
  });

});
