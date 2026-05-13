import { expect, test } from '@playwright/test';

test.describe('Hudl login', () => {
  test('shows a validation message when email is empty', async ({ page }) => {
    await page.goto('/login');

    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    await expect(page.getByTestId('email-input-help-text')).toContainText(
      'Please enter your email address',
    );
  });
});
