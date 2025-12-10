// spec: specs/swag-labs-e2e.plan.md
// seed: tests/seed.spec.ts
// user: problem_user

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';

async function login(page: any) {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', 'problem_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  await page.waitForURL('**/inventory.html');
}

test.describe('6. 商品詳細画面テスト (problem_user)', () => {
  test('6.1 商品詳細画面への遷移', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. 任意の商品名をクリックする
    await page.click('[data-test="item-4-title-link"]');

    // Expected: /inventory-item.html?id=xxx に遷移する
    await expect(page).toHaveURL(/.*inventory-item\.html\?id=.*/);

    // Expected: 商品の画像、商品名、説明、価格、Add to cart ボタンが表示される
    await expect(page.locator('.inventory_details_img')).toBeVisible();
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    await expect(page.locator('.inventory_details_desc')).toBeVisible();
    await expect(page.locator('.inventory_details_price')).toBeVisible();
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  });

  test('6.2 商品詳細画面からカートに追加', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. 任意の商品名をクリックする
    await page.click('[data-test="item-4-title-link"]');

    // 3. 「Add to cart」ボタンをクリックする
    await page.click('[data-test="add-to-cart"]');

    // Expected: ボタンが「Remove」に変わる
    await expect(page.locator('[data-test="remove"]')).toBeVisible();

    // Expected: カートアイコンにバッジ「1」が表示される
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('6.3 商品詳細画面から一覧に戻る', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. 任意の商品名をクリックする
    await page.click('[data-test="item-4-title-link"]');

    // 3. 「Back to products」ボタンをクリックする
    await page.click('[data-test="back-to-products"]');

    // Expected: /inventory.html に遷移する
    await expect(page).toHaveURL(/.*inventory\.html/);
  });
});
