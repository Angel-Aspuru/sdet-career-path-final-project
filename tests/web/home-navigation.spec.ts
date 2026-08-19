import { test, expect } from '../../src/fixtures/pages';

test.describe('Home page navigation', () => {
  test('loads the homepage and navigates to the Products page', async ({ homePage, productsPage }) => {
    await homePage.open();
    await homePage.expectLoaded();

    await homePage.goToProducts();

    await expect(productsPage.pageTitle).toHaveText('All Products');
    expect(await productsPage.productCount()).toBeGreaterThan(0);
  });
});
