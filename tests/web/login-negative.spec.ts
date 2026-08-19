import { test } from '../../src/fixtures/pages';

test.describe('Login', () => {
  test('logging in with invalid credentials shows an error message', async ({ signupLoginPage }) => {
    await signupLoginPage.open();

    await signupLoginPage.login('nonexistent_user_qa_test_12345@example.com', 'WrongPassword123!');

    await signupLoginPage.expectLoginError('Your email or password is incorrect!');
  });
});
