// spec: specs/swag-labs-problem-user.plan.md
// user: problem_user

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';
const PROBLEM_USER = 'problem_user';
const PASSWORD = 'secret_sauce';

test.describe('5. 注文完了テスト（E2E ハッピーパス） (problem_user)', () => {
  test('5.1 注文完了フロー', async ({ page }) => {
    // 1. https://www.saucedemo.com にアクセスする
    await page.goto(BASE_URL);

    // 2. problem_user / secret_sauce でログインする
    await page.fill('[data-test="username"]', PROBLEM_USER);
    await page.fill('[data-test="password"]', PASSWORD);
    await page.click('[data-test="login-button"]');

    // 3. 「Sauce Labs Backpack」の「Add to cart」ボタンをクリックする
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

    // 4. カートアイコンをクリックする
    await page.click('.shopping_cart_link');

    // 5. 「Checkout」ボタンをクリックする
    await page.click('[data-test="checkout"]');

    // 6. First Name に「Test」を入力する
    await page.fill('[data-test="firstName"]', 'Test');

    // 7. Last Name に「User」を入力する
    await page.fill('[data-test="lastName"]', 'User');

    // 8. Postal Code に「12345」を入力する
    await page.fill('[data-test="postalCode"]', '12345');

    // 9. 「Continue」ボタンをクリックする
    await page.click('[data-test="continue"]');

    // 10. 注文明細を確認する
    await expect(page).toHaveURL(/checkout-step-two\.html/);

    // 11. 「Finish」ボタンをクリックする
    await page.click('[data-test="finish"]');

    // Expected: /checkout-complete.html に遷移する
    await expect(page).toHaveURL(/checkout-complete\.html/);

    // Expected: 「Thank you for your order!」が表示される
    const completeHeader = page.locator('.complete-header');
    await expect(completeHeader).toContainText('Thank you for your order!');
  });
});
