import { expect } from '@wdio/globals';
import { ProductsScreen } from '../screens/ProductsScreen';
import { CartScreen } from '../screens/CartScreen';

describe('Cart', () => {
  it('adding a product from the listing shows it in the cart with the right details', async () => {
    const productsScreen = new ProductsScreen();
    const cartScreen = new CartScreen();

    await productsScreen.open();

    const productName = (await productsScreen.productName(0).getText()).trim();
    const productId = await productsScreen.productCards[0].$('.productinfo .add-to-cart').getAttribute('data-product-id');

    await productsScreen.addProductToCartByIndex(0);
    await productsScreen.viewCartFromModal();

    await expect(cartScreen.cartTable).toBeDisplayed();
    expect(await cartScreen.rowCount()).toBeGreaterThan(0);
    await cartScreen.expectProductInCart(Number(productId), productName);
  });
});
