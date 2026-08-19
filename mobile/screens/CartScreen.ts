import { $, $$, expect } from '@wdio/globals';
import { BaseScreen } from './BaseScreen';

export class CartScreen extends BaseScreen {
  get cartTable() {
    return $('#cart_info');
  }

  get cartRows() {
    return $$('#cart_info tbody tr');
  }

  async open(): Promise<void> {
    await super.open('/view_cart');
  }

  async rowCount(): Promise<number> {
    const rows = await this.cartRows;
    return rows.length;
  }

  async expectProductInCart(productId: number, productName: string): Promise<void> {
    const row = $(`#product-${productId}`);
    await expect(row).toBeDisplayed();
    await expect(row.$('.cart_description h4 a')).toHaveText(productName);
  }
}
