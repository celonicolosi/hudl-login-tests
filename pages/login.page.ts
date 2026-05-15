import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly continueButton: Locator;
  readonly forgetPasswordLink: Locator;
  readonly emailHelpText: Locator;
  readonly passwordHelpText: Locator;
  readonly homeNavigationLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('email-input-input');
    this.passwordInput = page.getByTestId('password-input-input');
    this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
    this.forgetPasswordLink = page.getByTestId('forgot-password');
    this.emailHelpText = page.getByTestId('email-input-help-text');
    this.passwordHelpText = page.getByTestId('password-input-help-text');
    this.homeNavigationLink = page.getByTestId('webnav-globalnav-home');
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async submitEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.continueButton.click();
  }

  async submitPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    await this.continueButton.click();
  }

  async openResetPasswordFlow(): Promise<void> {
    await this.forgetPasswordLink.click();
  }
}
