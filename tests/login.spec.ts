import { expect, test } from '@playwright/test';
import { env } from '../utils/env';

test.describe('Hudl login', () => {
  test('shows a validation message when email is empty', async ({ page }) => {
    await page.goto('/login');

    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    await expect(page.getByTestId('email-input-help-text')).toContainText(
      'Please enter your email address',
    );
  });

  test('shows a validation message when email format is invalid', async ({ page }) => {
    await page.goto('/login');

    await page.getByTestId('email-input-input').fill('not-an-email');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    await expect(page.getByTestId('email-input-help-text')).toContainText('Enter a valid email.');
  });

  test('shows a validation message when password is empty', async ({ page }) => {
    await page.goto('/login');

    await page.getByTestId('email-input-input').fill(env.hudlEmail);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    await expect(page.getByTestId('password-input-help-text')).toContainText(
      'Please enter your password',
    );
  });

  test('shows an error when password is incorrect', async ({ page }) => {
    await page.goto('/login');

    await page.getByTestId('email-input-input').fill(env.hudlEmail);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    await page.getByTestId('password-input-input').fill('incorrect-password');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    await expect(page.getByTestId('password-input-help-text')).toContainText(
      'Your email or password is incorrect. Try again.',
    );
  });

  test('opens the reset password flow from the password step', async ({ page }) => {
    await page.goto('/login');

    await page.getByTestId('email-input-input').fill(env.hudlEmail);
    await page.getByRole('button', { name: 'Continue', exact: true }).click();

    await page.getByTestId('forgot-password').click();

    await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
    await expect(page.getByText("We'll send you a link to")).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Go Back' })).toBeVisible();
  });
});
