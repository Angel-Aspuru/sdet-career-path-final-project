import { test, expect } from '../../src/fixtures/pages';

test.describe('Product search', () => {
  test('returns matching results for a valid term and none for a nonsense term', async ({ productsPage }) => {
    await productsPage.open();

    await productsPage.searchProduct('Top');
    const matchCount = await productsPage.productCount();
    expect(matchCount).toBeGreaterThan(0);
    const firstCardText = await productsPage.productName(0).textContent();
    expect(firstCardText).toBeTruthy();

    await productsPage.searchProduct('zzz-nonexistent-product-zzz');
    expect(await productsPage.productCount()).toBe(0);
  });
});
