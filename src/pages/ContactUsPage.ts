import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface ContactUsFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class ContactUsPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.nameInput = this.locator('input[name="name"]');
    this.emailInput = this.locator('input[name="email"]');
    this.subjectInput = this.locator('input[name="subject"]');
    this.messageInput = this.locator('textarea[name="message"]');
    this.submitButton = this.locator('input[data-qa="submit-button"]');
    this.successMessage = this.locator('.status.alert-success');
  }

  async open(): Promise<void> {
    await this.goto('/contact_us');
  }

  async submitForm(data: ContactUsFormData): Promise<void> {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);
    await this.messageInput.fill(data.message);
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.submitButton.click();
  }

  async expectSubmissionSucceeded(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage).toContainText('Success');
  }
}
