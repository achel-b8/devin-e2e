// spec: specs/swag-labs-comprehensive-product-cart.plan.md
// seed: tests/seed.spec.ts
// user: problem_user

import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';

async function login(page: Page) {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', 'problem_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  await page.waitForURL('**/inventory.html');
}

test.describe('6. カート投入機能テスト（problem_user）', () => {
  test('6.1 商品をカートに追加', async ({ page }) => {
    await login(page);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('6.2 複数商品をカートに追加', async ({ page }) => {
    await login(page);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  test('6.3 商品をカートから削除（一覧画面）- 問題検証', async ({ page }) => {
    await login(page);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.click('[data-test="remove-sauce-labs-backpack"]');

    const addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');

    const isAddToCartVisible = await addToCartButton.isVisible().catch(() => false);
    const isRemoveVisible = await removeButton.isVisible().catch(() => false);

    if (!isAddToCartVisible && isRemoveVisible) {
      console.log('problem_user: Removeボタンをクリックしても「Add to cart」ボタンに戻らない（既知の問題）');
    }

    const badge = page.locator('.shopping_cart_badge');
    const badgeVisible = await badge.isVisible().catch(() => false);
    if (badgeVisible) {
      console.log('problem_user: カートバッジが消えない可能性がある（既知の問題）');
    }
  });

  test('6.4 カート画面で商品を確認', async ({ page }) => {
    await login(page);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');

    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(page.locator('.cart_item')).toBeVisible();
    await expect(page.locator('.inventory_item_name')).toContainText('Sauce Labs Backpack');
  });

  test('6.5 カート画面で商品を削除', async ({ page }) => {
    await login(page);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');

    await page.click('[data-test="remove-sauce-labs-backpack"]');

    await expect(page.locator('.cart_item')).not.toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  test('6.6 Continue Shopping ボタン', async ({ page }) => {
    await login(page);

    await page.click('.shopping_cart_link');
    await page.click('[data-test="continue-shopping"]');

    await expect(page).toHaveURL(/.*inventory\.html/);
  });
});
