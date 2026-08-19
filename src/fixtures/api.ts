import { test as base } from '@playwright/test';
import { ApiClient } from '../api/ApiClient';

interface ApiFixtures {
  apiClient: ApiClient;
}

export const test = base.extend<ApiFixtures>({
  apiClient: async ({ request }, use) => {
    await use(new ApiClient(request));
  },
});

export { expect } from '@playwright/test';
