import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignupLoginPage extends BasePage {
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly loginErrorText: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    super(page);
    this.loginEmailInput = this.locator('[data-qa="login-email"]');
    this.loginPasswordInput = this.locator('[data-qa="login-password"]');
    this.loginButton = this.locator('[data-qa="login-button"]');
    this.loginErrorText = this.locator('.login-form p');
    this.signupNameInput = this.locator('[data-qa="signup-name"]');
    this.signupEmailInput = this.locator('[data-qa="signup-email"]');
    this.signupButton = this.locator('[data-qa="signup-button"]');
  }

  async open(): Promise<void> {
    await this.goto('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginError(message: string): Promise<void> {
    await expect(this.loginErrorText).toHaveText(message);
  }
}
