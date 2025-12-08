// spec: specs/playwright-dev.md
// Generated using Playwright Agents MCP

import { test, expect } from '@playwright/test';

test.describe('1. ホームページテスト', () => {
  test('1.1 ホームページの基本表示確認', async ({ page }) => {
    // 1. https://playwright.dev/ にアクセスする
    await page.goto('https://playwright.dev/');

    // 2. ページタイトルに「Playwright」が含まれていることを確認する
    await expect(page).toHaveTitle(/Playwright/);

    // 3. メインヘッダーが表示されていることを確認する
    const mainHeading = page.getByRole('heading', {
      name: 'Playwright enables reliable end-to-end testing for modern web apps.',
      level: 1,
    });
    await expect(mainHeading).toBeVisible();

    // 4. 「Get started」リンクが表示されていることを確認する
    const getStartedLink = page.getByRole('link', { name: 'Get started' });
    await expect(getStartedLink).toBeVisible();

    // 5. GitHubスターボタンが表示されていることを確認する
    const starButton = page.getByRole('link', { name: /Star microsoft\/playwright on GitHub/ });
    await expect(starButton).toBeVisible();
  });

  test('1.2 ナビゲーションメニューの確認', async ({ page }) => {
    // 1. https://playwright.dev/ にアクセスする
    await page.goto('https://playwright.dev/');

    // 2. Playwrightロゴが表示されていることを確認する
    const logo = page.getByRole('img', { name: 'Playwright logo' });
    await expect(logo).toBeVisible();

    // 3. 検索ボタンが表示されていることを確認する
    const searchButton = page.getByRole('button', { name: /Search/ });
    await expect(searchButton).toBeVisible();
  });

  test('1.3 フッターリンクの確認', async ({ page }) => {
    // 1. https://playwright.dev/ にアクセスする
    await page.goto('https://playwright.dev/');

    // 2. フッターに「Learn」セクションが表示されていることを確認する
    const footer = page.locator('footer');
    await expect(footer.getByText('Learn', { exact: true })).toBeVisible();

    // 3. フッターに「Community」セクションが表示されていることを確認する
    await expect(footer.getByText('Community', { exact: true })).toBeVisible();

    // 4. フッターに「More」セクションが表示されていることを確認する
    await expect(footer.getByText('More', { exact: true })).toBeVisible();

    // 5. コピーライト表示が存在することを確認する
    await expect(footer.getByText(/Copyright © \d{4} Microsoft/)).toBeVisible();
  });
});
