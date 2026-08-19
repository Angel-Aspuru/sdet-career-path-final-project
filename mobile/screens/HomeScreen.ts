import { $, $$, browser, expect } from '@wdio/globals';
import { BaseScreen } from './BaseScreen';

export class HomeScreen extends BaseScreen {
  get productsNavLink() {
    return $('a[href="/products"]');
  }

  get cartNavLink() {
    return $('a[href="/view_cart"]');
  }

  get loginNavLink() {
    return $('a[href="/login"]');
  }

  get contactUsNavLink() {
    return $('a[href="/contact_us"]');
  }

  get featuredProducts() {
    return $$('.features_items .product-image-wrapper');
  }

  async open(): Promise<void> {
    await super.open('/');
  }

  async goToProducts(): Promise<void> {
    // Native taps on header nav links are unreliable on this site: ad
    // iframes the page injects can overlap them, so intercepted-click
    // errors are common. A JS-dispatched click (see BaseScreen.clickViaJs)
    // ignores the overlapping ad and reaches the link directly.
    await this.clickViaJs(this.productsNavLink);
    await browser.waitUntil(async () => (await browser.getUrl()).includes('/products'), {
      timeout: 10000,
      timeoutMsg: 'Did not navigate to /products',
    });
  }

  async goToCart(): Promise<void> {
    await this.clickViaJs(this.cartNavLink);
    await browser.waitUntil(async () => (await browser.getUrl()).includes('/view_cart'), {
      timeout: 10000,
      timeoutMsg: 'Did not navigate to /view_cart',
    });
  }

  async goToLogin(): Promise<void> {
    await this.clickViaJs(this.loginNavLink);
    await browser.waitUntil(async () => (await browser.getUrl()).includes('/login'), {
      timeout: 10000,
      timeoutMsg: 'Did not navigate to /login',
    });
  }

  async goToContactUs(): Promise<void> {
    await this.clickViaJs(this.contactUsNavLink);
    await browser.waitUntil(async () => (await browser.getUrl()).includes('/contact_us'), {
      timeout: 10000,
      timeoutMsg: 'Did not navigate to /contact_us',
    });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.productsNavLink).toBeDisplayed();
    await expect(this.featuredProducts[0]).toBeDisplayed();
  }
}
