// spec: specs/playwright-dev.md
// Generated using Playwright Agents MCP

import { test, expect } from '@playwright/test';

test.describe('3. コミュニティページテスト', () => {
  test('3.1 Welcomeページの表示確認', async ({ page }) => {
    // 1. https://playwright.dev/community/welcome にアクセスする
    await page.goto('https://playwright.dev/community/welcome');

    // 2. ページタイトルに「Welcome」が含まれていることを確認する
    await expect(page).toHaveTitle(/Welcome/);

    // 3. 「Welcome」見出しが表示されていることを確認する
    const welcomeHeading = page.getByRole('heading', { name: 'Welcome', level: 1 });
    await expect(welcomeHeading).toBeVisible();

    // 4. 「Ambassadors」セクションが表示されていることを確認する
    const ambassadorsHeading = page.getByRole('heading', { name: /Ambassadors/ });
    await expect(ambassadorsHeading).toBeVisible();

    // 5. 「GitHub」セクションが表示されていることを確認する
    const githubHeading = page.getByRole('heading', { name: /^GitHub/ });
    await expect(githubHeading).toBeVisible();

    // 6. 「Community Discord」セクションが表示されていることを確認する
    const discordHeading = page.getByRole('heading', { name: /Community Discord/ });
    await expect(discordHeading).toBeVisible();
  });
});
