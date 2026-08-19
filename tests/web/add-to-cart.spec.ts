import { test, expect } from '../../src/fixtures/pages';

test.describe('Cart', () => {
  test('adding a product from the listing shows it in the cart with the right details', async ({
    productsPage,
    cartPage,
  }) => {
    await productsPage.open();

    const productName = (await productsPage.productName(0).textContent())?.trim() ?? '';
    const productId = await productsPage.productCards
      .first()
      .locator('.productinfo .add-to-cart')
      .getAttribute('data-product-id');

    await productsPage.addProductToCartByIndex(0);
    await productsPage.viewCartFromModal();

    await expect(cartPage.cartTable).toBeVisible();
    expect(await cartPage.rowCount()).toBeGreaterThan(0);
    await cartPage.expectProductInCart(Number(productId), productName);
  });
});
