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

test.describe('2. 商品一覧機能テスト (problem_user)', () => {
  test('2.1 商品一覧表示', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. 商品一覧画面を確認する
    await expect(page).toHaveURL(/inventory\.html/);

    // Expected: 6つの商品が表示される
    const inventoryItems = page.locator('.inventory_item');
    await expect(inventoryItems).toHaveCount(6);

    // Expected: 各商品に商品名、価格、Add to cart ボタンが表示される
    const firstItem = inventoryItems.first();
    await expect(firstItem.locator('.inventory_item_name')).toBeVisible();
    await expect(firstItem.locator('.inventory_item_price')).toBeVisible();
    await expect(firstItem.locator('button')).toBeVisible();
  });

  test('2.2 商品ソート（名前昇順）', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. ソートドロップダウンから「Name (A to Z)」を選択する
    await page.selectOption('[data-test="product-sort-container"]', 'az');

    // Expected: 商品が名前のアルファベット順（A→Z）で並び替えられる
    const firstItemName = await page.locator('.inventory_item_name').first().textContent();
    expect(firstItemName).toBe('Sauce Labs Backpack');
  });

  test('2.3 商品ソート（価格昇順）', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. ソートドロップダウンから「Price (low to high)」を選択する
    await page.selectOption('[data-test="product-sort-container"]', 'lohi');

    // Expected: 商品が価格の安い順で並び替えられる
    const firstItemName = await page.locator('.inventory_item_name').first().textContent();
    expect(firstItemName).toBe('Sauce Labs Onesie');
  });
});
