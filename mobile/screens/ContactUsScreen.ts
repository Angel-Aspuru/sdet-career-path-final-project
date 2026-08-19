import { $, browser, expect } from '@wdio/globals';
import { BaseScreen } from './BaseScreen';

export interface ContactUsFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class ContactUsScreen extends BaseScreen {
  get nameInput() {
    return $('input[name="name"]');
  }

  get emailInput() {
    return $('input[name="email"]');
  }

  get subjectInput() {
    return $('input[name="subject"]');
  }

  get messageInput() {
    return $('textarea[name="message"]');
  }

  get submitButton() {
    return $('[data-qa="submit-button"]');
  }

  get successMessage() {
    return $('.status.alert-success');
  }

  async open(): Promise<void> {
    await super.open('/contact_us');
  }

  async submitForm(data: ContactUsFormData): Promise<void> {
    await this.nameInput.setValue(data.name);
    await this.emailInput.setValue(data.email);
    await this.subjectInput.setValue(data.subject);
    await this.messageInput.setValue(data.message);

    // A native tap can land on a floating overlay chip Chrome injects on
    // Android, so the submit is dispatched via JS (see BaseScreen.clickViaJs).
    await this.clickViaJs(this.submitButton);

    const alertText = await browser.getAlertText().catch(() => null);
    if (alertText !== null) {
      await browser.acceptAlert();
    }
  }

  async expectSubmissionSucceeded(): Promise<void> {
    await expect(this.successMessage).toBeDisplayed();
    await expect(this.successMessage).toHaveText('Success', { containing: true });
  }
}
