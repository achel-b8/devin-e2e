// spec: specs/swag-labs-e2e.plan.md
// seed: tests/seed.spec.ts
// user: problem_user

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';

test.describe('5. 注文完了テスト（E2E ハッピーパス） (problem_user)', () => {
  test('5.1 注文完了フロー', async ({ page }) => {
    // 1. https://www.saucedemo.com にアクセスする
    await page.goto(BASE_URL);

    // 2. problem_user / secret_sauce でログインする
    await page.fill('[data-test="username"]', 'problem_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
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
    await expect(page.locator('.cart_item')).toBeVisible();

    // 11. 「Finish」ボタンをクリックする
    await page.click('[data-test="finish"]');

    // Expected: /checkout-complete.html に遷移する
    await expect(page).toHaveURL(/.*checkout-complete\.html/);

    // Expected: 「Thank you for your order!」が表示される
    await expect(page.locator('.complete-header')).toContainText('Thank you for your order!');
  });

  test('5.2 注文完了後の Back Home', async ({ page }) => {
    // 1. 注文完了フロー（5.1）を実行する
    await page.goto(BASE_URL);
    await page.fill('[data-test="username"]', 'problem_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'Test');
    await page.fill('[data-test="lastName"]', 'User');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');

    // 2. 「Back Home」ボタンをクリックする
    await page.click('[data-test="back-to-products"]');

    // Expected: /inventory.html に遷移する
    await expect(page).toHaveURL(/.*inventory\.html/);

    // Expected: カートが空になっている（バッジが表示されない）
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
  });
});
