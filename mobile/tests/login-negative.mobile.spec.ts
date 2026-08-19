import { LoginScreen } from '../screens/LoginScreen';

describe('Login', () => {
  it('logging in with invalid credentials shows an error message', async () => {
    const loginScreen = new LoginScreen();
    await loginScreen.open();

    await loginScreen.login('nonexistent_user_qa_test_12345@example.com', 'WrongPassword123!');

    await loginScreen.expectLoginError('Your email or password is incorrect!');
  });
});
