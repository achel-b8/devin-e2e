// spec: specs/swag-labs-problem-user.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const PROBLEM_USER = 'problem_user';
const PASSWORD = 'secret_sauce';

async function login(page: any) {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', PROBLEM_USER);
  await page.fill('[data-test="password"]', PASSWORD);
  await page.click('[data-test="login-button"]');
  await page.waitForURL(/.*inventory.html/);
}

test.describe('6. ハンバーガーメニューテスト', () => {
  test('6.1 ログアウト', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. ハンバーガーメニューをクリックする
    await page.click('#react-burger-menu-btn');

    // メニューが開くのを待つ
    await page.waitForSelector('#logout_sidebar_link', { state: 'visible' });

    // 3. 「Logout」をクリックする
    await page.click('#logout_sidebar_link');

    // Expected: /（ログイン画面）に遷移する
    await expect(page).toHaveURL(BASE_URL + '/');
  });
});
