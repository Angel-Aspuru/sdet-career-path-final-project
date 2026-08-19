import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly pageTitle: Locator;
  readonly productCards: Locator;
  readonly modalContinueShoppingButton: Locator;
  readonly modalViewCartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = this.locator('#search_product');
    this.searchButton = this.locator('#submit_search');
    this.pageTitle = this.locator('.title.text-center');
    this.productCards = this.locator('.features_items .product-image-wrapper');
    this.modalContinueShoppingButton = this.locator('.modal-content button.close-modal');
    this.modalViewCartLink = this.locator('.modal-content a[href="/view_cart"]');
  }

  async open(): Promise<void> {
    await this.goto('/products');
    await expect(this.productCards.first()).toBeVisible();
  }

  async searchProduct(name: string): Promise<void> {
    await this.searchInput.fill(name);
    await this.searchButton.click();
    await expect(this.pageTitle).toHaveText('Searched Products');
  }

  async productCount(): Promise<number> {
    return this.productCards.count();
  }

  productName(index: number): Locator {
    return this.productCards.nth(index).locator('.productinfo p');
  }

  async addProductToCartByIndex(index: number): Promise<void> {
    const card = this.productCards.nth(index);
    await card.hover();
    await card.locator('.productinfo .add-to-cart').click();
    await expect(this.modalViewCartLink).toBeVisible();
  }

  async continueShopping(): Promise<void> {
    await this.modalContinueShoppingButton.click();
  }

  async viewCartFromModal(): Promise<void> {
    await this.modalViewCartLink.click();
  }
}
