import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const STANDARD_USER = 'standard_user';
const PASSWORD = 'secret_sauce';

/**
 * ログインヘルパー関数
 */
async function login(page: any, username: string = STANDARD_USER, password: string = PASSWORD) {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', username);
  await page.fill('[data-test="password"]', password);
  await page.click('[data-test="login-button"]');
}

test.describe('Swag Labs E2E Tests - Seed', () => {
  test('seed - サイトにアクセスできることを確認', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Swag Labs/);
  });
});
