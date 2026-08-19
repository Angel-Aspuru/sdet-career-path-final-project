import { test } from '../../src/fixtures/pages';

test.describe('Contact Us', () => {
  test('submitting the contact form shows a success confirmation', async ({ contactUsPage }) => {
    await contactUsPage.open();

    await contactUsPage.submitForm({
      name: 'QA Test',
      email: `qa.test.${Date.now()}@example.com`,
      subject: 'SDET final project test',
      message: 'This message was submitted by an automated Playwright test.',
    });

    await contactUsPage.expectSubmissionSucceeded();
  });
});
