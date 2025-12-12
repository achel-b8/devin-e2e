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
    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  test('4.2 チェックアウト Step One - Last Name 未入力エラー（problem_user特有）', async ({ page }) => {
    // 1-4. problem_user でログインし、商品をカートに追加してチェックアウトへ
    await addToCartAndGoToCheckout(page);

    // 5. Last Name に「User」を入力する
    // problem_user特有: [data-test="lastName"]への入力がFirst Nameフィールドに入ってしまう
    await page.fill('[data-test="lastName"]', 'User');

    // 6. Postal Code に「12345」を入力する
    await page.fill('[data-test="postalCode"]', '12345');

    // 7. 「Continue」ボタンをクリックする
    await page.click('[data-test="continue"]');

    // Expected: problem_user特有の問題により、Last Nameが空のままなので
    // エラーメッセージ「Error: Last Name is required」が表示される
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toContainText('Error: Last Name is required');

    // Expected: 同画面に留まる
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });
});
