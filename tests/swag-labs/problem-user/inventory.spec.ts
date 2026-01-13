// spec: specs/swag-labs-problem-user.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const PROBLEM_USER = 'problem_user';
const PASSWORD = 'secret_sauce';

async function login(page: any) {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', PROBLEM_USER);
  await page.fill('[data-test="password"]', PASSWORD);
  await page.click('[data-test="login-button"]');
  await page.waitForURL(/.*inventory.html/);
}

test.describe('2. 商品一覧機能テスト', () => {
  test('2.1 商品一覧表示と画像の確認', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. 商品一覧画面を確認する
    // Expected: 6つの商品が表示される
    const inventoryItems = page.locator('.inventory_item');
    await expect(inventoryItems).toHaveCount(6);

    // Expected: 各商品に商品名、価格、Add to cart ボタンが表示される
    const firstItem = inventoryItems.first();
    await expect(firstItem.locator('.inventory_item_name')).toBeVisible();
    await expect(firstItem.locator('.inventory_item_price')).toBeVisible();
    await expect(firstItem.locator('button')).toBeVisible();

    // Expected: 全ての商品画像が正常に表示される（sl-404.jpgではない）
    // problem_userでは全ての商品画像が壊れている（sl-404.jpg）ためFailする
    const images = page.locator('.inventory_item_img img');
    const imageCount = await images.count();
    for (let i = 0; i < imageCount; i++) {
      const src = await images.nth(i).getAttribute('src');
      expect(src).not.toContain('sl-404');
    }
  });

  test('2.2 商品ソート（名前昇順）', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. ソートドロップダウンから「Name (A to Z)」を選択する
    await page.selectOption('[data-test="product-sort-container"]', 'az');

    // Expected: ソート後、最初の商品は「Sauce Labs Backpack」（A-Zの最初）
    // problem_userではソートが正常に動作しないためFailする
    const firstItemName = await page.locator('.inventory_item_name').first().textContent();
    expect(firstItemName).toBe('Sauce Labs Backpack');
  });

  test('2.3 商品ソート（価格昇順）', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. ソートドロップダウンから「Price (low to high)」を選択する
    await page.selectOption('[data-test="product-sort-container"]', 'lohi');

    // Expected: ソート後、最初の商品価格は「$7.99」（最安値）
    // problem_userではソートが正常に動作しないためFailする
    const firstItemPrice = await page.locator('.inventory_item_price').first().textContent();
    expect(firstItemPrice).toBe('$7.99');
  });
});
