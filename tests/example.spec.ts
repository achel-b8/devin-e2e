import { test, expect } from '@playwright/test';

test.describe('Example Test Suite', () => {
  test('should load Playwright homepage', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('should have documentation link', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    const docsLink = page.getByRole('link', { name: 'Docs' });
    await expect(docsLink).toBeVisible();
  });
});
