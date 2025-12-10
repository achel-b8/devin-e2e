// spec: specs/swag-labs-e2e.plan.md
// seed: tests/seed.spec.ts
// user: problem_user

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';

test.describe('1. ログイン機能テスト (problem_user)', () => {
  test('1.1 正常ログイン', async ({ page }) => {
    // 1. https://www.saucedemo.com にアクセスする
    await page.goto(BASE_URL);

    // 2. Username フィールドに「problem_user」を入力する
    await page.fill('[data-test="username"]', 'problem_user');

    // 3. Password フィールドに「secret_sauce」を入力する
    await page.fill('[data-test="password"]', 'secret_sauce');

    // 4. Login ボタンをクリックする
    await page.click('[data-test="login-button"]');

    // Expected: /inventory.html に遷移する
    await expect(page).toHaveURL(/.*inventory\.html/);

    // Expected: 商品一覧が表示される
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('1.2 ユーザー名未入力エラー', async ({ page }) => {
    // 1. https://www.saucedemo.com にアクセスする
    await page.goto(BASE_URL);

    // 2. Password フィールドに「secret_sauce」を入力する
    await page.fill('[data-test="password"]', 'secret_sauce');

    // 3. Login ボタンをクリックする
    await page.click('[data-test="login-button"]');

    // Expected: エラーメッセージ「Epic sadface: Username is required」が表示される
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username is required');

    // Expected: ログイン画面に留まる
    await expect(page).toHaveURL(BASE_URL);
  });

  test('1.3 パスワード未入力エラー', async ({ page }) => {
    // 1. https://www.saucedemo.com にアクセスする
    await page.goto(BASE_URL);

    // 2. Username フィールドに「problem_user」を入力する
    await page.fill('[data-test="username"]', 'problem_user');

    // 3. Login ボタンをクリックする
    await page.click('[data-test="login-button"]');

    // Expected: エラーメッセージ「Epic sadface: Password is required」が表示される
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Password is required');

    // Expected: ログイン画面に留まる
    await expect(page).toHaveURL(BASE_URL);
  });

  test('1.4 認証情報不正エラー', async ({ page }) => {
    // 1. https://www.saucedemo.com にアクセスする
    await page.goto(BASE_URL);

    // 2. Username フィールドに「invalid_user」を入力する
    await page.fill('[data-test="username"]', 'invalid_user');

    // 3. Password フィールドに「wrong_password」を入力する
    await page.fill('[data-test="password"]', 'wrong_password');

    // 4. Login ボタンをクリックする
    await page.click('[data-test="login-button"]');

    // Expected: エラーメッセージ「Epic sadface: Username and password do not match any user in this service」が表示される
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');

    // Expected: ログイン画面に留まる
    await expect(page).toHaveURL(BASE_URL);
  });

  test('1.5 ロックアウトユーザーエラー', async ({ page }) => {
    // 1. https://www.saucedemo.com にアクセスする
    await page.goto(BASE_URL);

    // 2. Username フィールドに「locked_out_user」を入力する
    await page.fill('[data-test="username"]', 'locked_out_user');

    // 3. Password フィールドに「secret_sauce」を入力する
    await page.fill('[data-test="password"]', 'secret_sauce');

    // 4. Login ボタンをクリックする
    await page.click('[data-test="login-button"]');

    // Expected: エラーメッセージ「Epic sadface: Sorry, this user has been locked out.」が表示される
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');

    // Expected: ログイン画面に留まる
    await expect(page).toHaveURL(BASE_URL);
  });
});
