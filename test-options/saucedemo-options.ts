import { test as base} from "@playwright/test";

type TestOptions = {

}

export const test = base.extend<TestOptions>({
  page: async ({ page }, run) => {
    await page.goto("/");
    await run(page);
  },
});
