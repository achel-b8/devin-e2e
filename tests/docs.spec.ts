// spec: specs/playwright-dev.md
// Generated using Playwright Agents MCP

import { test, expect } from '@playwright/test';

test.describe('2. ドキュメントページテスト', () => {
  test('2.1 Getting Startedページの表示確認', async ({ page }) => {
    // 1. https://playwright.dev/docs/intro にアクセスする
    await page.goto('https://playwright.dev/docs/intro');

    // 2. ページタイトルに「Installation」が含まれていることを確認する
    await expect(page).toHaveTitle(/Installation/);

    // 3. 「Installation」見出しが表示されていることを確認する
    const installationHeading = page.getByRole('heading', { name: 'Installation', level: 1 });
    await expect(installationHeading).toBeVisible();

    // 4. インストールコマンドが表示されていることを確認する
    const installCommand = page.getByText('npm init playwright@latest');
    await expect(installCommand).toBeVisible();
  });

  test('2.2 ドキュメントナビゲーションの確認', async ({ page }) => {
    // 1. https://playwright.dev/docs/intro にアクセスする
    await page.goto('https://playwright.dev/docs/intro');

    // 2. サイドバーナビゲーションが表示されていることを確認する
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();

    // 3. 「Next」ナビゲーションリンクが表示されていることを確認する
    const nextLink = page.getByRole('link', { name: /Next.*Writing tests/ });
    await expect(nextLink).toBeVisible();
  });
});
