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

test.describe('1. 商品一覧機能テスト（standard_user）', () => {
  test('1.1 商品一覧の基本表示確認', async ({ page }) => {
    await login(page);

    const products = page.locator('.inventory_item');
    await expect(products).toHaveCount(6);

    const firstProduct = products.first();
    await expect(firstProduct.locator('img.inventory_item_img')).toBeVisible();
    await expect(firstProduct.locator('.inventory_item_name')).toBeVisible();
    await expect(firstProduct.locator('.inventory_item_desc')).toBeVisible();
    await expect(firstProduct.locator('.inventory_item_price')).toBeVisible();
    await expect(firstProduct.locator('button')).toBeVisible();

    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
  });

  test('1.2 全商品の個別表示確認', async ({ page }) => {
    await login(page);

    for (const product of PRODUCTS) {
      const productItem = page.locator('.inventory_item').filter({ hasText: product.name });
      await expect(productItem).toBeVisible();
      await expect(productItem.locator('.inventory_item_price')).toHaveText(product.price);
    }
  });

  test('1.3 商品画像の表示確認', async ({ page }) => {
    await login(page);

    const images = page.locator('img.inventory_item_img');
    await expect(images).toHaveCount(6);

    for (let i = 0; i < 6; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
      const src = await img.getAttribute('src');
      expect(src).toBeTruthy();
      expect(src).not.toBe('');
    }
  });

  test('1.4 商品ソート（名前昇順 A to Z）', async ({ page }) => {
    await login(page);

    await page.selectOption('[data-test="product-sort-container"]', 'az');

    const productNames = await page.locator('.inventory_item_name').allTextContents();
    const sortedNames = [...productNames].sort();
    expect(productNames).toEqual(sortedNames);

    expect(productNames[0]).toBe('Sauce Labs Backpack');
    expect(productNames[5]).toBe('Test.allTheThings() T-Shirt (Red)');
  });

  test('1.5 商品ソート（名前降順 Z to A）', async ({ page }) => {
    await login(page);

    await page.selectOption('[data-test="product-sort-container"]', 'za');

    const productNames = await page.locator('.inventory_item_name').allTextContents();
    const sortedNames = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedNames);

    expect(productNames[0]).toBe('Test.allTheThings() T-Shirt (Red)');
    expect(productNames[5]).toBe('Sauce Labs Backpack');
  });

  test('1.6 商品ソート（価格昇順 low to high）', async ({ page }) => {
    await login(page);

    await page.selectOption('[data-test="product-sort-container"]', 'lohi');

    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sortedPrices);

    const productNames = await page.locator('.inventory_item_name').allTextContents();
    expect(productNames[0]).toBe('Sauce Labs Onesie');
    expect(productNames[5]).toBe('Sauce Labs Fleece Jacket');
  });

  test('1.7 商品ソート（価格降順 high to low）', async ({ page }) => {
    await login(page);

    await page.selectOption('[data-test="product-sort-container"]', 'hilo');

    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => b - a);
    expect(numericPrices).toEqual(sortedPrices);

    const productNames = await page.locator('.inventory_item_name').allTextContents();
    expect(productNames[0]).toBe('Sauce Labs Fleece Jacket');
    expect(productNames[5]).toBe('Sauce Labs Onesie');
  });

  test('1.8 ソート状態の確認（詳細画面遷移後）', async ({ page }) => {
    await login(page);

    await page.selectOption('[data-test="product-sort-container"]', 'hilo');

    const pricesBefore = await page.locator('.inventory_item_price').allTextContents();
    const numericPricesBefore = pricesBefore.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...numericPricesBefore].sort((a, b) => b - a);
    expect(numericPricesBefore).toEqual(sortedPrices);

    await page.click('[data-test="item-4-title-link"]');
    await expect(page).toHaveURL(/.*inventory-item\.html\?id=.*/);

    await page.click('[data-test="back-to-products"]');
    await expect(page).toHaveURL(/.*inventory\.html/);

    const sortDropdown = page.locator('[data-test="product-sort-container"]');
    await expect(sortDropdown).toBeVisible();
  });
});
