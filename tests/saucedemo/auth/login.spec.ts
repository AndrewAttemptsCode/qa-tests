import { expect, test } from "@playwright/test";
import Login from "../../../pages/saucedemo/Login.js";

test.describe("Authentication", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  
  test("login with valid credentials", async ({ page }) => {
    const login = new Login(page);
    await login.loginWithUsername();
    await expect(page.getByText("Products")).toBeVisible();
  });

});
