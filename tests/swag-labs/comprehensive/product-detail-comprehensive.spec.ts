// spec: specs/swag-labs-comprehensive-product-cart.plan.md
// seed: tests/seed.spec.ts
// user: standard_user

import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';

const PRODUCTS = [
  { id: 4, name: 'Sauce Labs Backpack', price: '$29.99', dataTest: 'sauce-labs-backpack', titleLink: 'item-4-title-link' },
  { id: 0, name: 'Sauce Labs Bike Light', price: '$9.99', dataTest: 'sauce-labs-bike-light', titleLink: 'item-0-title-link' },
  { id: 1, name: 'Sauce Labs Bolt T-Shirt', price: '$15.99', dataTest: 'sauce-labs-bolt-t-shirt', titleLink: 'item-1-title-link' },
  { id: 5, name: 'Sauce Labs Fleece Jacket', price: '$49.99', dataTest: 'sauce-labs-fleece-jacket', titleLink: 'item-5-title-link' },
  { id: 2, name: 'Sauce Labs Onesie', price: '$7.99', dataTest: 'sauce-labs-onesie', titleLink: 'item-2-title-link' },
  { id: 3, name: 'Test.allTheThings() T-Shirt (Red)', price: '$15.99', dataTest: 'test.allthethings()-t-shirt-(red)', titleLink: 'item-3-title-link' },
];

async function login(page: Page) {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  await page.waitForURL('**/inventory.html');
}

test.describe('2. 商品詳細画面テスト（standard_user）', () => {
  test('2.1 各商品の詳細画面への遷移確認', async ({ page }) => {
    await login(page);

    for (const product of PRODUCTS) {
      await page.goto(`${BASE_URL}/inventory.html`);
      await page.click(`[data-test="${product.titleLink}"]`);
      await expect(page).toHaveURL(new RegExp(`.*inventory-item\\.html\\?id=${product.id}`));
      await expect(page.locator('.inventory_details_name')).toHaveText(product.name);
    }
  });

  test('2.2 商品詳細画面の要素確認', async ({ page }) => {
    await login(page);

    await page.click('[data-test="item-4-title-link"]');

    await expect(page.locator('.inventory_details_img')).toBeVisible();
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    await expect(page.locator('.inventory_details_desc')).toBeVisible();
    await expect(page.locator('.inventory_details_price')).toBeVisible();
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  });

  test('2.3 商品詳細の内容一致確認（Sauce Labs Backpack）', async ({ page }) => {
    await login(page);

    await page.click('[data-test="item-4-title-link"]');

    await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_details_price')).toHaveText('$29.99');
    await expect(page.locator('.inventory_details_desc')).toBeVisible();
    const desc = await page.locator('.inventory_details_desc').textContent();
    expect(desc).toBeTruthy();
    expect(desc!.length).toBeGreaterThan(0);
  });

  test('2.4 商品詳細の内容一致確認（全商品）', async ({ page }) => {
    await login(page);

    for (const product of PRODUCTS) {
      await page.goto(`${BASE_URL}/inventory.html`);

      const listPrice = await page.locator('.inventory_item').filter({ hasText: product.name }).locator('.inventory_item_price').textContent();

      await page.click(`[data-test="${product.titleLink}"]`);

      await expect(page.locator('.inventory_details_name')).toHaveText(product.name);
      await expect(page.locator('.inventory_details_price')).toHaveText(listPrice!);
    }
  });

  test('2.5 商品画像クリックでの詳細画面遷移', async ({ page }) => {
    await login(page);

    await page.click('[data-test="item-4-img-link"]');

    await expect(page).toHaveURL(/.*inventory-item\.html\?id=4/);
    await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');
  });

  test('2.6 詳細画面からカートに追加', async ({ page }) => {
    await login(page);

    await page.click('[data-test="item-4-title-link"]');
    await page.click('[data-test="add-to-cart"]');

    await expect(page.locator('[data-test="remove"]')).toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('2.7 詳細画面でカートから削除', async ({ page }) => {
    await login(page);

    await page.click('[data-test="item-4-title-link"]');
    await page.click('[data-test="add-to-cart"]');
    await expect(page.locator('[data-test="remove"]')).toBeVisible();

    await page.click('[data-test="remove"]');

    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });

  test('2.8 詳細画面から一覧に戻る', async ({ page }) => {
    await login(page);

    await page.click('[data-test="item-4-title-link"]');
    await page.click('[data-test="back-to-products"]');

    await expect(page).toHaveURL(/.*inventory\.html/);
  });
});
