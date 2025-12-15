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

test.describe('3. カート機能テスト (problem_user)', () => {
  test('3.1 商品をカートに追加', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. 任意の商品の「Add to cart」ボタンをクリックする
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // Expected: ボタンが「Remove」に変わる
    const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    await expect(removeButton).toBeVisible();

    // Expected: カートアイコンにバッジが表示される
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });

  test('3.2 カート画面で商品を確認', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. 任意の商品の「Add to cart」ボタンをクリックする
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // 3. カートアイコンをクリックする
    await page.click('.shopping_cart_link');

    // Expected: /cart.html に遷移する
    await expect(page).toHaveURL(/cart\.html/);

    // Expected: 追加した商品が表示される
    const cartItem = page.locator('.cart_item');
    await expect(cartItem).toBeVisible();
    await expect(cartItem.locator('.inventory_item_name')).toContainText('Sauce Labs Backpack');
  });
});
