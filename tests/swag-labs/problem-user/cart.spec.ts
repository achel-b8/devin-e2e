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

test.describe('3. カート機能テスト (problem_user)', () => {
  test('3.1 商品をカートに追加', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. 任意の商品の「Add to cart」ボタンをクリックする
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Expected: ボタンが「Remove」に変わる
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();

    // Expected: カートアイコンにバッジ「1」が表示される
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('3.2 複数商品をカートに追加', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. 1つ目の商品の「Add to cart」ボタンをクリックする
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // 3. 2つ目の商品の「Add to cart」ボタンをクリックする
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    // Expected: 両方のボタンが「Remove」に変わる
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();

    // Expected: カートアイコンにバッジ「2」が表示される
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  test('3.3 商品をカートから削除（一覧画面）', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. 任意の商品の「Add to cart」ボタンをクリックする
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // 3. 同じ商品の「Remove」ボタンをクリックする
    await page.click('[data-test="remove-sauce-labs-backpack"]');

    // Expected: ボタンが「Add to cart」に戻る
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();

    // Expected: カートアイコンのバッジが消える
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  test('3.4 カート画面で商品を確認', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. 任意の商品の「Add to cart」ボタンをクリックする
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // 3. カートアイコンをクリックする
    await page.click('.shopping_cart_link');

    // Expected: /cart.html に遷移する
    await expect(page).toHaveURL(/.*cart\.html/);

    // Expected: 追加した商品が表示される
    await expect(page.locator('.cart_item')).toBeVisible();

    // Expected: 商品名、価格、Remove ボタンが表示される
    await expect(page.locator('.inventory_item_name')).toContainText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_price')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
  });

  test('3.5 カート画面で商品を削除', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. 任意の商品の「Add to cart」ボタンをクリックする
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // 3. カートアイコンをクリックする
    await page.click('.shopping_cart_link');

    // 4. 「Remove」ボタンをクリックする
    await page.click('[data-test="remove-sauce-labs-backpack"]');

    // Expected: 商品がカートから削除される
    await expect(page.locator('.cart_item')).not.toBeVisible();

    // Expected: カートが空になる
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  test('3.6 Continue Shopping ボタン', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. カートアイコンをクリックする
    await page.click('.shopping_cart_link');

    // 3. 「Continue Shopping」ボタンをクリックする
    await page.click('[data-test="continue-shopping"]');

    // Expected: /inventory.html に遷移する
    await expect(page).toHaveURL(/.*inventory\.html/);
  });
});
