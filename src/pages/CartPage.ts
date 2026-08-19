import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly cartTable: Locator;
  readonly cartRows: Locator;

  constructor(page: Page) {
    super(page);
    this.cartTable = this.locator('#cart_info');
    this.cartRows = this.locator('#cart_info tbody tr');
  }

  async open(): Promise<void> {
    await this.goto('/view_cart');
  }

  async rowCount(): Promise<number> {
    return this.cartRows.count();
  }

  async expectProductInCart(productId: number, productName: string): Promise<void> {
    const row = this.locator(`#product-${productId}`);
    await expect(row).toBeVisible();
    await expect(row.locator('.cart_description h4 a')).toHaveText(productName);
  }

  async removeProduct(productId: number): Promise<void> {
    await this.locator(`#product-${productId} .cart_quantity_delete`).click();
  }
}
