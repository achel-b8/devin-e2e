// spec: specs/swag-labs-e2e.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';

async function login(page: any) {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  await page.waitForURL('**/inventory.html');
}

test.describe('7. ハンバーガーメニューテスト', () => {
  test('7.1 ログアウト', async ({ page }) => {
    // 1. standard_user でログインする
    await login(page);

    // 2. ハンバーガーメニューをクリックする
    await page.click('#react-burger-menu-btn');

    // 3. 「Logout」をクリックする
    await page.click('[data-test="logout-sidebar-link"]');

    // Expected: /（ログイン画面）に遷移する
    await expect(page).toHaveURL(BASE_URL + '/');
  });

  test('7.2 Reset App State', async ({ page }) => {
    // 1. standard_user でログインする
    await login(page);

    // 2. 任意の商品の「Add to cart」ボタンをクリックする
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // カートバッジが表示されることを確認
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // 3. ハンバーガーメニューをクリックする
    await page.click('#react-burger-menu-btn');

    // 4. 「Reset App State」をクリックする
    await page.click('[data-test="reset-sidebar-link"]');

    // Expected: カートが空になる（バッジが消える）
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

    // メニューを閉じる
    await page.click('#react-burger-cross-btn');

    // ページをリロードしてボタンの状態を更新
    await page.reload();

    // Expected: 商品ボタンが「Add to cart」に戻る
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();

    // Expected: ログイン状態は維持される
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('7.3 All Items', async ({ page }) => {
    // 1. standard_user でログインする
    await login(page);

    // 2. カートアイコンをクリックする
    await page.click('.shopping_cart_link');

    // カート画面にいることを確認
    await expect(page).toHaveURL(/.*cart\.html/);

    // 3. ハンバーガーメニューをクリックする
    await page.click('#react-burger-menu-btn');

    // 4. 「All Items」をクリックする
    await page.click('[data-test="inventory-sidebar-link"]');

    // Expected: /inventory.html に遷移する
    await expect(page).toHaveURL(/.*inventory\.html/);
  });
});
