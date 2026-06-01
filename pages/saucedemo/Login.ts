import type { Page } from "@playwright/test";

type UsernameOptions = "standard_user" | "locked_out_user" | "problem_user" | "performance_glitch_user" | "error_user" | "visual_user";

class Login {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async loginWithUsername(username: UsernameOptions = "standard_user") {
    await this.page.getByTestId("username").fill(username);
    await this.page.getByTestId("password").fill("secret_sauce");
    await this.page.getByTestId("login-button").click();
  }
}

export default Login;
