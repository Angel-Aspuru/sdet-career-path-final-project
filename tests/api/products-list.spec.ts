import Ajv from 'ajv';
import { test, expect } from '../../src/fixtures/api';
import { productsListSchema } from '../../src/api/schemas';

const ajv = new Ajv();
const validateProductsList = ajv.compile(productsListSchema);

test.describe('GET /api/productsList', () => {
  test('returns a product list that matches the expected JSON schema', async ({ apiClient }) => {
    const body = await apiClient.getProductsList();

    const isValid = validateProductsList(body);

    expect(isValid, JSON.stringify(validateProductsList.errors)).toBe(true);
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
  });
});
