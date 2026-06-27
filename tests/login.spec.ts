import { test, expect } from '@playwright/test';

test('standard user can log in to saucedemo', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://www.saucedemo.com/');

    // Fill in username
    await page.locator('#user-name').fill('standard_user');

    // Fill in password
    await page.locator('#password').fill('secret_sauce');

    // Click the Login button
    await page.locator('#login-button').click();

    // Verify the URL contains "inventory.html"
    await expect(page).toHaveURL(/inventory.html/);
});


test('locked out user sees an error message', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://www.saucedemo.com/');

    // Fill in username
    await page.locator('#user-name').fill('locked_out_user');

    // Fill in password
    await page.locator('#password').fill('secret_sauce');

    // Click the Login button
    await page.locator('#login-button').click();

    // Verify an error message is visible and contains "locked out"
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
});