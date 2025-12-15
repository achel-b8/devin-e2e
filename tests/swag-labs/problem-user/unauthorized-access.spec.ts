// spec: specs/swag-labs-problem-user.plan.md
// user: problem_user

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';

test.describe('8. 未認証アクセステスト (problem_user)', () => {
  test('8.1 未ログイン状態で商品一覧にアクセス', async ({ page }) => {
    // 1. ログインせずに https://www.saucedemo.com/inventory.html に直接アクセスする
    await page.goto(BASE_URL + '/inventory.html');

    // Expected: ログイン画面にリダイレクトされる
    await expect(page).toHaveURL(BASE_URL + '/');

    // Expected: エラーメッセージが表示される
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toContainText("Epic sadface: You can only access '/inventory.html' when you are logged in.");
  });
});
