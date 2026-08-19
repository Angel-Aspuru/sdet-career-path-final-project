import { $, expect } from '@wdio/globals';
import { BaseScreen } from './BaseScreen';

export class LoginScreen extends BaseScreen {
  get loginEmailInput() {
    return $('[data-qa="login-email"]');
  }

  get loginPasswordInput() {
    return $('[data-qa="login-password"]');
  }

  get loginButton() {
    return $('[data-qa="login-button"]');
  }

  get loginErrorText() {
    return $('.login-form p');
  }

  async open(): Promise<void> {
    await super.open('/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.loginEmailInput.setValue(email);
    await this.loginPasswordInput.setValue(password);
    await this.clickViaJs(this.loginButton);
  }

  async expectLoginError(message: string): Promise<void> {
    await expect(this.loginErrorText).toHaveText(message);
  }
}
