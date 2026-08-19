import { test, expect } from '../../src/fixtures/api';
import { ApiClient } from '../../src/api/ApiClient';
import { CreateAccountPayload } from '../../src/api/types';
import { buildTestAccountPayload } from '../../src/utils/testData';

test.describe('POST /api/verifyLogin', () => {
  let apiClient: ApiClient;
  let account: CreateAccountPayload;

  test.beforeAll(async ({ playwright }) => {
    const context = await playwright.request.newContext({ baseURL: process.env.API_BASE_URL || 'https://automationexercise.com' });
    apiClient = new ApiClient(context);
    account = buildTestAccountPayload('verify-login');
    const created = await apiClient.createAccount(account);
    expect(created.responseCode).toBe(201);
  });

  test.afterAll(async () => {
    await apiClient.deleteAccount(account.email, account.password);
  });

  test('validates credentials, rejects wrong ones, and rejects missing parameters', async () => {
    const valid = await apiClient.verifyLogin(account.email, account.password);
    expect(valid.responseCode).toBe(200);
    expect(valid.message).toBe('User exists!');

    const wrongPassword = await apiClient.verifyLogin(account.email, 'not-the-real-password');
    expect(wrongPassword.responseCode).toBe(404);
    expect(wrongPassword.message).toBe('User not found!');

    const missingPassword = await apiClient.verifyLogin(account.email, undefined);
    expect(missingPassword.responseCode).toBe(400);
    expect(missingPassword.message).toMatch(/email or password parameter is missing/i);
  });
});
