import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { env, hasHudlCredentials } from '../utils/env';

test.describe('Hudl login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('shows a validation message when email is empty', async () => {
    await loginPage.continueButton.click();

    await expect(loginPage.emailHelpText).toContainText('Please enter your email address');
  });

  test('shows a validation message when email format is invalid', async () => {
    await loginPage.submitEmail('not-an-email');

    await expect(loginPage.emailHelpText).toContainText('Enter a valid email.');
  });

  test('shows a validation message when password is empty', async () => {
    await loginPage.submitEmail('test@example.com');

    await loginPage.continueButton.click();

    await expect(loginPage.passwordHelpText).toContainText('Please enter your password');
  });

  test('shows an error when password is incorrect', async () => {
    await loginPage.submitEmail('test@example.com');

    await loginPage.submitPassword('incorrect-password');

    await expect(loginPage.passwordHelpText).toContainText('Incorrect username or password.');
  });

  test('masks the password input', async () => {
    await loginPage.submitEmail('test@example.com');

    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('opens the reset password flow from the password step', async ({ page }) => {
    await loginPage.submitEmail('test@example.com');

    await loginPage.openResetPasswordFlow();

    await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
    await expect(page.getByText("We'll send you a link to reset your password.")).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Go Back' })).toBeVisible();
  });

  test('logs in with valid credentials', async ({ page }) => {
    const email = env.hudlEmail;
    const password = env.hudlPassword;

    if (!hasHudlCredentials() || !email || !password) {
      test.skip(true, 'Valid Hudl credentials are required for the successful login test');
      return;
    }

    await loginPage.submitEmail(email);
    await loginPage.submitPassword(password);

    await expect(page).toHaveURL(/\/home/);
    await expect(page.getByTestId('webnav-globalnav-home').first()).toBeVisible();
  });
});
