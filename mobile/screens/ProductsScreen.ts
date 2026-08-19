import { $, $$, expect } from '@wdio/globals';
import { BaseScreen } from './BaseScreen';

export class ProductsScreen extends BaseScreen {
  get searchInput() {
    return $('#search_product');
  }

  get searchButton() {
    return $('#submit_search');
  }

  get pageTitle() {
    return $('.title.text-center');
  }

  get productCards() {
    return $$('.features_items .product-image-wrapper');
  }

  get modalViewCartLink() {
    return $('.modal-content a[href="/view_cart"]');
  }

  async open(): Promise<void> {
    await super.open('/products');
    await this.productCards[0].waitForDisplayed();
  }

  async searchProduct(name: string): Promise<void> {
    await this.searchInput.setValue(name);
    await this.clickViaJs(this.searchButton);
    // The heading is styled with text-transform: uppercase, and WebDriver's
    // getText() returns the CSS-rendered text (unlike Playwright's raw DOM
    // textContent), so compare case-insensitively.
    await expect(this.pageTitle).toHaveText('Searched Products', { ignoreCase: true });
  }

  async productCount(): Promise<number> {
    const cards = await this.productCards;
    return cards.length;
  }

  productName(index: number) {
    return this.productCards[index].$('.productinfo p');
  }

  async addProductToCartByIndex(index: number): Promise<void> {
    const card = this.productCards[index];
    await card.scrollIntoView();
    await this.clickViaJs(card.$('.productinfo .add-to-cart'));
    await this.modalViewCartLink.waitForDisplayed();
  }

  async viewCartFromModal(): Promise<void> {
    await this.clickViaJs(this.modalViewCartLink);
  }
}
