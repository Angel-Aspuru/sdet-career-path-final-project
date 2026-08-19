import { test, expect } from '../../src/fixtures/api';
import { buildTestAccountPayload } from '../../src/utils/testData';

test.describe('Account lifecycle (createAccount -> getUserDetailByEmail -> updateAccount -> deleteAccount)', () => {
  test('chains create, read, update and delete on a single account', async ({ apiClient }) => {
    const account = buildTestAccountPayload('lifecycle');

    const created = await apiClient.createAccount(account);
    expect(created.responseCode).toBe(201);
    expect(created.message).toBe('User created!');

    const afterCreate = await apiClient.getUserDetailByEmail(account.email);
    expect(afterCreate.responseCode).toBe(200);
    expect(afterCreate.user.email).toBe(account.email);
    expect(afterCreate.user.name).toBe(account.name);

    const updatedAccount = { ...account, name: `${account.name} Updated`, city: 'Newtown' };
    const updated = await apiClient.updateAccount(updatedAccount);
    expect(updated.responseCode).toBe(200);
    expect(updated.message).toBe('User updated!');

    const afterUpdate = await apiClient.getUserDetailByEmail(account.email);
    expect(afterUpdate.user.name).toBe(updatedAccount.name);
    expect(afterUpdate.user.city).toBe('Newtown');

    const deleted = await apiClient.deleteAccount(account.email, account.password);
    expect(deleted.responseCode).toBe(200);
    expect(deleted.message).toBe('Account deleted!');
  });
});
