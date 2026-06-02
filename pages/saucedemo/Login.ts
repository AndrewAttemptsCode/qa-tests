import type { Page } from "@playwright/test";

type UsernameOptions = "standard_user" | "locked_out_user" | "problem_user" | "performance_glitch_user" | "error_user" | "visual_user" | "invalid_user";

class Login {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async loginWithCredentials(username: UsernameOptions, password: string) {
    await this.page.getByTestId("username").fill(username);
    await this.page.getByTestId("password").fill(password);
    await this.page.getByTestId("login-button").click();
  }
}

export default Login;
