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

test.describe('2. 商品一覧機能テスト', () => {
  test('2.1 商品一覧表示', async ({ page }) => {
    // 1. standard_user でログインする
    await login(page);

    // 2. 商品一覧画面を確認する
    // Expected: 6つの商品が表示される
    const products = page.locator('.inventory_item');
    await expect(products).toHaveCount(6);

    // Expected: 各商品に画像、商品名、価格、Add to cart ボタンが表示される
    const firstProduct = products.first();
    await expect(firstProduct.locator('img.inventory_item_img')).toBeVisible();
    await expect(firstProduct.locator('.inventory_item_name')).toBeVisible();
    await expect(firstProduct.locator('.inventory_item_price')).toBeVisible();
    await expect(firstProduct.locator('button')).toBeVisible();
  });

  test('2.2 商品ソート（名前昇順）', async ({ page }) => {
    // 1. standard_user でログインする
    await login(page);

    // 2. ソートドロップダウンから「Name (A to Z)」を選択する
    await page.selectOption('[data-test="product-sort-container"]', 'az');

    // Expected: 商品が名前のアルファベット順（A→Z）で並び替えられる
    const productNames = await page.locator('.inventory_item_name').allTextContents();
    const sortedNames = [...productNames].sort();
    expect(productNames).toEqual(sortedNames);
  });

  test('2.3 商品ソート（名前降順）', async ({ page }) => {
    // 1. standard_user でログインする
    await login(page);

    // 2. ソートドロップダウンから「Name (Z to A)」を選択する
    await page.selectOption('[data-test="product-sort-container"]', 'za');

    // Expected: 商品が名前のアルファベット逆順（Z→A）で並び替えられる
    const productNames = await page.locator('.inventory_item_name').allTextContents();
    const sortedNames = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedNames);
  });

  test('2.4 商品ソート（価格昇順）', async ({ page }) => {
    // 1. standard_user でログインする
    await login(page);

    // 2. ソートドロップダウンから「Price (low to high)」を選択する
    await page.selectOption('[data-test="product-sort-container"]', 'lohi');

    // Expected: 商品が価格の安い順で並び替えられる
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sortedPrices);
  });

  test('2.5 商品ソート（価格降順）', async ({ page }) => {
    // 1. standard_user でログインする
    await login(page);

    // 2. ソートドロップダウンから「Price (high to low)」を選択する
    await page.selectOption('[data-test="product-sort-container"]', 'hilo');

    // Expected: 商品が価格の高い順で並び替えられる
    const prices = await page.locator('.inventory_item_price').allTextContents();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => b - a);
    expect(numericPrices).toEqual(sortedPrices);
  });
});
