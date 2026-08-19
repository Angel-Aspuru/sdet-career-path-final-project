import { test, expect } from '../../src/fixtures/api';
import { SearchProductResponse } from '../../src/api/types';

test.describe('POST /api/searchProduct', () => {
  test('returns matches for a valid term and a 400 when the parameter is missing', async ({ apiClient }) => {
    const matched = (await apiClient.searchProduct('Top')) as SearchProductResponse;
    expect(matched.responseCode).toBe(200);
    expect(matched.products.length).toBeGreaterThan(0);
    for (const product of matched.products) {
      expect(product).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(String),
        })
      );
    }

    const missingParam = await apiClient.searchProduct(undefined);
    expect(missingParam.responseCode).toBe(400);
    expect((missingParam as { message: string }).message).toMatch(/search_product parameter is missing/i);
  });
});
