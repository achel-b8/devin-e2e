// spec: specs/swag-labs-problem-user.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';

test.describe('7. 未認証アクセステスト', () => {
  test('7.1 未ログイン状態で商品一覧にアクセス', async ({ page }) => {
    // 1. ログインせずに https://www.saucedemo.com/inventory.html に直接アクセスする
    await page.goto(BASE_URL + '/inventory.html');

    // Expected: ログイン画面にリダイレクトされる
    await expect(page).toHaveURL(BASE_URL + '/');

    // Expected: エラーメッセージが表示される
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });
});
