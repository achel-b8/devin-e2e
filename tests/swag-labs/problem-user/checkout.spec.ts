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

async function addToCartAndGoToCheckout(page: any) {
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await page.waitForURL(/.*cart.html/);
  await page.click('[data-test="checkout"]');
  await page.waitForURL(/.*checkout-step-one.html/);
}

test.describe('4. チェックアウト機能テスト', () => {
  test('4.1 チェックアウト Step One - Last Name 入力問題（problem_user特有）', async ({ page }) => {
    // 1. problem_user でログインする
    await login(page);

    // 2-4. 商品をカートに追加し、チェックアウトへ進む
    await addToCartAndGoToCheckout(page);

    // 5. First Name に「Test」を入力する
    await page.fill('[data-test="firstName"]', 'Test');

    // 6. Last Name に「User」を入力する
    await page.fill('[data-test="lastName"]', 'User');

    // 7. Postal Code に「12345」を入力する
    await page.fill('[data-test="postalCode"]', '12345');

    // 8. 「Continue」ボタンをクリックする
    await page.click('[data-test="continue"]');

    // Expected: 正常に checkout-step-two.html に遷移する
    // problem_userではLast Nameの入力が正常に動作しないためFailする
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
  });
});
