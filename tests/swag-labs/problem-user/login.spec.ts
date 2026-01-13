// spec: specs/swag-labs-problem-user.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const PROBLEM_USER = 'problem_user';
const PASSWORD = 'secret_sauce';

test.describe('1. ログイン機能テスト', () => {
  test('1.1 正常ログイン', async ({ page }) => {
    // 1. https://www.saucedemo.com にアクセスする
    await page.goto(BASE_URL);

    // 2. Username フィールドに「problem_user」を入力する
    await page.fill('[data-test="username"]', PROBLEM_USER);

    // 3. Password フィールドに「secret_sauce」を入力する
    await page.fill('[data-test="password"]', PASSWORD);

    // 4. Login ボタンをクリックする
    await page.click('[data-test="login-button"]');

    // Expected: /inventory.html に遷移する
    await expect(page).toHaveURL(/.*inventory.html/);

    // Expected: 商品一覧が表示される
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('1.2 ユーザー名未入力エラー', async ({ page }) => {
    // 1. https://www.saucedemo.com にアクセスする
    await page.goto(BASE_URL);

    // 2. Password フィールドに「secret_sauce」を入力する
    await page.fill('[data-test="password"]', PASSWORD);

    // 3. Login ボタンをクリックする
    await page.click('[data-test="login-button"]');

    // Expected: エラーメッセージ「Epic sadface: Username is required」が表示される
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username is required');

    // Expected: ログイン画面に留まる
    await expect(page).toHaveURL(BASE_URL + '/');
  });
});
