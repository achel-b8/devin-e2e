// spec: specs/swag-labs-problem-user.plan.md
// user: problem_user

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const PROBLEM_USER = 'problem_user';
const PASSWORD = 'secret_sauce';

async function login(page: any) {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', PROBLEM_USER);
  await page.fill('[data-test="password"]', PASSWORD);
  await page.click('[data-test="login-button"]');
}

test.describe('7. ハンバーガーメニューテスト (problem_user)', () => {
  test('7.1 ログアウト', async ({ page }) => {
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

  test('7.2 Reset App State', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. 任意の商品の「Add to cart」ボタンをクリックする
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // カートバッジが表示されることを確認
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // 3. ハンバーガーメニューをクリックする
    await page.click('#react-burger-menu-btn');

    // メニューが開くのを待つ
    await page.waitForSelector('#reset_sidebar_link', { state: 'visible' });

    // 4. 「Reset App State」をクリックする
    await page.click('#reset_sidebar_link');

    // Expected: カートが空になる（バッジが消える）
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });
});
