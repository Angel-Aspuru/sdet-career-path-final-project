import { expect } from '@wdio/globals';
import { HomeScreen } from '../screens/HomeScreen';
import { ProductsScreen } from '../screens/ProductsScreen';

describe('Home screen navigation', () => {
  it('loads the homepage and navigates to the Products screen', async () => {
    const homeScreen = new HomeScreen();
    const productsScreen = new ProductsScreen();

    await homeScreen.open();
    await homeScreen.expectLoaded();

    await homeScreen.goToProducts();

    await expect(productsScreen.pageTitle).toHaveText('All Products', { ignoreCase: true });
    expect(await productsScreen.productCount()).toBeGreaterThan(0);
  });
});
