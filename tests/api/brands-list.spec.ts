import { test, expect } from '../../src/fixtures/api';

test.describe('GET /api/brandsList', () => {
  test('returns a non-empty list of unique brand ids', async ({ apiClient }) => {
    const body = await apiClient.getBrandsList();

    expect(body.responseCode).toBe(200);
    expect(body.brands.length).toBeGreaterThan(0);

    const ids = body.brands.map((brand) => brand.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const brand of body.brands) {
      expect(typeof brand.brand).toBe('string');
      expect(brand.brand.length).toBeGreaterThan(0);
    }
  });
});
