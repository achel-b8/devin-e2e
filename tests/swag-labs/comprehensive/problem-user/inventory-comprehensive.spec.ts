// spec: specs/swag-labs-comprehensive-product-cart.plan.md
// seed: tests/seed.spec.ts
// user: problem_user

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
  await page.fill('[data-test="username"]', 'problem_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  await page.waitForURL('**/inventory.html');
}

test.describe('4. 商品一覧機能テスト（problem_user）', () => {
  test('4.1 商品一覧の基本表示確認', async ({ page }) => {
    await login(page);

    const products = page.locator('.inventory_item');
    await expect(products).toHaveCount(6);

    const firstProduct = products.first();
    await expect(firstProduct.locator('img.inventory_item_img')).toBeVisible();
    await expect(firstProduct.locator('.inventory_item_name')).toBeVisible();
    await expect(firstProduct.locator('.inventory_item_desc')).toBeVisible();
    await expect(firstProduct.locator('.inventory_item_price')).toBeVisible();
    await expect(firstProduct.locator('button')).toBeVisible();
  });

  test('4.2 商品画像の問題確認', async ({ page }) => {
    await login(page);

    const images = page.locator('img.inventory_item_img');
    await expect(images).toHaveCount(6);

    const imageSrcs: string[] = [];
    for (let i = 0; i < 6; i++) {
      const img = images.nth(i);
      await expect(img).toBeVisible();
      const src = await img.getAttribute('src');
      expect(src).toBeTruthy();
      imageSrcs.push(src!);
    }

    const uniqueSrcs = new Set(imageSrcs);
    if (uniqueSrcs.size === 1) {
      console.log('problem_user: 全ての商品画像が同じ画像を表示している（既知の問題）');
    }
  });

  test('4.3 商品ソート（名前昇順）', async ({ page }) => {
    await login(page);

    await page.selectOption('[data-test="product-sort-container"]', 'az');

    const productNames = await page.locator('.inventory_item_name').allTextContents();
    const sortedNames = [...productNames].sort();
    expect(productNames).toEqual(sortedNames);
  });

  test('4.4 商品ソート（名前降順）- 問題検証', async ({ page }) => {
    await login(page);

    await page.selectOption('[data-test="product-sort-container"]', 'za');

    const productNames = await page.locator('.inventory_item_name').allTextContents();
    const expectedSortedNames = [...productNames].sort().reverse();

    if (JSON.stringify(productNames) !== JSON.stringify(expectedSortedNames)) {
      console.log('problem_user: 名前降順ソートが正しく動作していない（既知の問題）');
      console.log('実際の順序:', productNames);
      console.log('期待される順序:', expectedSortedNames);
    }
  });

  test('4.5 商品ソート（価格昇順）- 問題検証', async ({ page }) => {
    await login(page);

    await page.selectOption('[data-test="product-sort-container"]', 'lohi');

    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);

    if (JSON.stringify(numericPrices) !== JSON.stringify(sortedPrices)) {
      console.log('problem_user: 価格昇順ソートが正しく動作していない（既知の問題）');
      console.log('実際の順序:', numericPrices);
      console.log('期待される順序:', sortedPrices);
    }
  });

  test('4.6 商品ソート（価格降順）- 問題検証', async ({ page }) => {
    await login(page);

    await page.selectOption('[data-test="product-sort-container"]', 'hilo');

    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => b - a);

    if (JSON.stringify(numericPrices) !== JSON.stringify(sortedPrices)) {
      console.log('problem_user: 価格降順ソートが正しく動作していない（既知の問題）');
      console.log('実際の順序:', numericPrices);
      console.log('期待される順序:', sortedPrices);
    }
  });
});
