import { expect } from '@wdio/globals';
import { ProductsScreen } from '../screens/ProductsScreen';

describe('Product search', () => {
  it('returns matching results for a valid term and none for a nonsense term', async () => {
    const productsScreen = new ProductsScreen();
    await productsScreen.open();

    await productsScreen.searchProduct('Top');
    const matchCount = await productsScreen.productCount();
    expect(matchCount).toBeGreaterThan(0);
    const firstCardText = await productsScreen.productName(0).getText();
    expect(firstCardText.length).toBeGreaterThan(0);

    await productsScreen.searchProduct('zzz-nonexistent-product-zzz');
    expect(await productsScreen.productCount()).toBe(0);
  });
});
