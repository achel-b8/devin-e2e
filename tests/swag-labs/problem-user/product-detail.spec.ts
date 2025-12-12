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

test.describe('6. 商品詳細画面テスト (problem_user)', () => {
  test('6.1 商品詳細画面への遷移', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2. 任意の商品名をクリックする
    await page.click('[data-test="item-4-title-link"]');

    // Expected: /inventory-item.html?id=xxx に遷移する
    await expect(page).toHaveURL(/inventory-item\.html/);

    // Expected: 商品の画像、商品名、説明、価格、Add to cart ボタンが表示される
    await expect(page.locator('.inventory_details_img')).toBeVisible();
    await expect(page.locator('.inventory_details_name')).toBeVisible();
    await expect(page.locator('.inventory_details_desc')).toBeVisible();
    await expect(page.locator('.inventory_details_price')).toBeVisible();
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  });
});
