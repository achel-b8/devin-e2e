// spec: specs/swag-labs-e2e.plan.md
// seed: tests/seed.spec.ts
// user: problem_user

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';

async function login(page: any) {
  await page.goto(BASE_URL);
  await page.fill('[data-test="username"]', 'problem_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  await page.waitForURL('**/inventory.html');
}

async function addToCartAndGoToCheckout(page: any) {
  await login(page);
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
}

test.describe('4. チェックアウト機能テスト (problem_user)', () => {
  test('4.1 チェックアウト Step One 正常遷移', async ({ page }) => {
    // 1-4. problem_user でログインし、商品をカートに追加してチェックアウトへ
    await addToCartAndGoToCheckout(page);

    // 5. First Name に「Test」を入力する
    await page.fill('[data-test="firstName"]', 'Test');

    // 6. Last Name に「User」を入力する
    await page.fill('[data-test="lastName"]', 'User');

    // 7. Postal Code に「12345」を入力する
    await page.fill('[data-test="postalCode"]', '12345');

    // 8. 「Continue」ボタンをクリックする
    await page.click('[data-test="continue"]');

    // Expected: /checkout-step-two.html に遷移する
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
  });

  test('4.2 チェックアウト Step One - First Name 未入力エラー', async ({ page }) => {
    // 1-4. problem_user でログインし、商品をカートに追加してチェックアウトへ
    await addToCartAndGoToCheckout(page);

    // 5. Last Name に「User」を入力する
    await page.fill('[data-test="lastName"]', 'User');

    // 6. Postal Code に「12345」を入力する
    await page.fill('[data-test="postalCode"]', '12345');

    // 7. 「Continue」ボタンをクリックする
    await page.click('[data-test="continue"]');

    // Expected: エラーメッセージ「Error: First Name is required」が表示される
    await expect(page.locator('[data-test="error"]')).toContainText('Error: First Name is required');

    // Expected: 同画面に留まる
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);
  });

  test('4.3 チェックアウト Step One - Last Name 未入力エラー', async ({ page }) => {
    // 1-4. problem_user でログインし、商品をカートに追加してチェックアウトへ
    await addToCartAndGoToCheckout(page);

    // 5. First Name に「Test」を入力する
    await page.fill('[data-test="firstName"]', 'Test');

    // 6. Postal Code に「12345」を入力する
    await page.fill('[data-test="postalCode"]', '12345');

    // 7. 「Continue」ボタンをクリックする
    await page.click('[data-test="continue"]');

    // Expected: エラーメッセージ「Error: Last Name is required」が表示される
    await expect(page.locator('[data-test="error"]')).toContainText('Error: Last Name is required');

    // Expected: 同画面に留まる
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);
  });

  test('4.4 チェックアウト Step One - Postal Code 未入力エラー', async ({ page }) => {
    // 1-4. problem_user でログインし、商品をカートに追加してチェックアウトへ
    await addToCartAndGoToCheckout(page);

    // 5. First Name に「Test」を入力する
    await page.fill('[data-test="firstName"]', 'Test');

    // 6. Last Name に「User」を入力する
    await page.fill('[data-test="lastName"]', 'User');

    // 7. 「Continue」ボタンをクリックする
    await page.click('[data-test="continue"]');

    // Expected: エラーメッセージ「Error: Postal Code is required」が表示される
    await expect(page.locator('[data-test="error"]')).toContainText('Error: Postal Code is required');

    // Expected: 同画面に留まる
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);
  });

  test('4.5 チェックアウト Step One - Cancel ボタン', async ({ page }) => {
    // 1-4. problem_user でログインし、商品をカートに追加してチェックアウトへ
    await addToCartAndGoToCheckout(page);

    // 5. 「Cancel」ボタンをクリックする
    await page.click('[data-test="cancel"]');

    // Expected: /cart.html に遷移する
    await expect(page).toHaveURL(/.*cart\.html/);
  });

  test('4.6 チェックアウト Step Two - 注文明細確認', async ({ page }) => {
    // 1-4. problem_user でログインし、商品をカートに追加してチェックアウトへ
    await addToCartAndGoToCheckout(page);

    // 5. First Name、Last Name、Postal Code を入力する
    await page.fill('[data-test="firstName"]', 'Test');
    await page.fill('[data-test="lastName"]', 'User');
    await page.fill('[data-test="postalCode"]', '12345');

    // 6. 「Continue」ボタンをクリックする
    await page.click('[data-test="continue"]');

    // Expected: 注文明細（商品名、価格）が表示される
    await expect(page.locator('.cart_item')).toBeVisible();
    await expect(page.locator('.inventory_item_name')).toBeVisible();
    await expect(page.locator('.inventory_item_price')).toBeVisible();

    // Expected: Item total、Tax、Total が表示される
    await expect(page.locator('.summary_subtotal_label')).toBeVisible();
    await expect(page.locator('.summary_tax_label')).toBeVisible();
    await expect(page.locator('.summary_total_label')).toBeVisible();
  });

  test('4.7 チェックアウト Step Two - Cancel ボタン', async ({ page }) => {
    // 1-6. problem_user でログインし、商品をカートに追加してチェックアウト Step Two へ
    await addToCartAndGoToCheckout(page);
    await page.fill('[data-test="firstName"]', 'Test');
    await page.fill('[data-test="lastName"]', 'User');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    // 7. 「Cancel」ボタンをクリックする
    await page.click('[data-test="cancel"]');

    // Expected: /inventory.html に遷移する
    await expect(page).toHaveURL(/.*inventory\.html/);
  });
});
