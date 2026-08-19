import { ContactUsScreen } from '../screens/ContactUsScreen';

describe('Contact Us', () => {
  it('submitting the contact form shows a success confirmation', async () => {
    const contactUsScreen = new ContactUsScreen();
    await contactUsScreen.open();

    await contactUsScreen.submitForm({
      name: 'QA Mobile Test',
      email: `qa.mobile.${Date.now()}@example.com`,
      subject: 'SDET final project mobile test',
      message: 'This message was submitted by an automated Appium/WebdriverIO test.',
    });

    await contactUsScreen.expectSubmissionSucceeded();
  });
});
