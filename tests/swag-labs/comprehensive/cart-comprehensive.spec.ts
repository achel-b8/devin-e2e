// spec: specs/swag-labs-comprehensive-product-cart.plan.md
// seed: tests/seed.spec.ts
// user: standard_user

import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';

const PRODUCTS = [
  { id: 4, name: 'Sauce Labs Backpack', price: '$29.99', dataTest: 'sauce-labs-backpack' },
  { id: 0, name: 'Sauce Labs Bike Light', price: '$9.99', dataTest: 'sauce-labs-bike-light' },
  { id: 1, name: 'Sauce Labs Bolt T-Shirt', price: '$15.99', dataTest: 'sauce-labs-bolt-t-shirt' },
  { id: 5, name: 'Sauce Labs Fleece Jacket', price: '$49.99', dataTest: 'sauce-labs-fleece-jacket' },
  { id: 2, name: 'Sauce Labs Onesie', price: '$7.99', dataTest: 'sauce-labs-onesie' },
  { id: 3, name: 'Test.allTheThings() T-Shirt (Red)', price: '$15.99', dataTest: 'test.allthethings()-t-shirt-(red)' },
];

async function login(page: Page) {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  await page.waitForURL('**/inventory.html');
}

test.describe('3. カート投入機能テスト（standard_user）', () => {
  test('3.1 単一商品をカートに追加', async ({ page }) => {
    await login(page);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('3.2 複数商品をカートに追加（2商品）', async ({ page }) => {
    await login(page);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  test('3.3 全商品をカートに追加（6商品）', async ({ page }) => {
    await login(page);

    for (const product of PRODUCTS) {
      await page.click(`[data-test="add-to-cart-${product.dataTest}"]`);
    }

    for (const product of PRODUCTS) {
      await expect(page.locator(`[data-test="remove-${product.dataTest}"]`)).toBeVisible();
    }
    await expect(page.locator('.shopping_cart_badge')).toHaveText('6');
  });

  test('3.4 商品をカートから削除（一覧画面）', async ({ page }) => {
    await login(page);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await page.click('[data-test="remove-sauce-labs-backpack"]');

    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  test('3.5 複数商品から一部を削除', async ({ page }) => {
    await login(page);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    await page.click('[data-test="remove-sauce-labs-backpack"]');

    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('[data-test="remove-sauce-labs-bike-light"]')).toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('3.6 カート画面で商品を確認', async ({ page }) => {
    await login(page);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');

    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(page.locator('.cart_item')).toBeVisible();
    await expect(page.locator('.inventory_item_name')).toContainText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_price')).toHaveText('$29.99');
    await expect(page.locator('.cart_quantity')).toHaveText('1');
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
  });

  test('3.7 カート画面で複数商品を確認', async ({ page }) => {
    await login(page);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('.shopping_cart_link');

    await expect(page).toHaveURL(/.*cart\.html/);
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(2);

    await expect(page.locator('.inventory_item_name').filter({ hasText: 'Sauce Labs Backpack' })).toBeVisible();
    await expect(page.locator('.inventory_item_name').filter({ hasText: 'Sauce Labs Bike Light' })).toBeVisible();
  });

  test('3.8 カート画面で商品を削除', async ({ page }) => {
    await login(page);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');

    await page.click('[data-test="remove-sauce-labs-backpack"]');

    await expect(page.locator('.cart_item')).not.toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  test('3.9 カート画面で一部商品を削除', async ({ page }) => {
    await login(page);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('.shopping_cart_link');

    await page.click('[data-test="remove-sauce-labs-backpack"]');

    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.locator('.inventory_item_name')).toContainText('Sauce Labs Bike Light');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('3.10 Continue Shopping ボタン', async ({ page }) => {
    await login(page);

    await page.click('.shopping_cart_link');
    await page.click('[data-test="continue-shopping"]');

    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('3.11 カート追加後に一覧に戻った時の状態確認', async ({ page }) => {
    await login(page);

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="continue-shopping"]');

    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('3.12 詳細画面からカート追加後の一覧画面状態', async ({ page }) => {
    await login(page);

    await page.click('[data-test="item-4-title-link"]');
    await page.click('[data-test="add-to-cart"]');
    await page.click('[data-test="back-to-products"]');

    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });
});
