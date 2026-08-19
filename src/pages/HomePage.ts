import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly productsNavLink: Locator;
  readonly cartNavLink: Locator;
  readonly loginNavLink: Locator;
  readonly contactUsNavLink: Locator;
  readonly featuredProducts: Locator;

  constructor(page: Page) {
    super(page);
    this.productsNavLink = this.locator('a[href="/products"]');
    this.cartNavLink = this.locator('a[href="/view_cart"]');
    this.loginNavLink = this.locator('a[href="/login"]');
    this.contactUsNavLink = this.locator('a[href="/contact_us"]');
    this.featuredProducts = this.locator('.features_items .product-image-wrapper');
  }

  async open(): Promise<void> {
    await this.goto('/');
  }

  async goToProducts(): Promise<void> {
    await Promise.all([this.page.waitForURL(/\/products/), this.productsNavLink.click()]);
  }

  async goToCart(): Promise<void> {
    await Promise.all([this.page.waitForURL(/\/view_cart/), this.cartNavLink.click()]);
  }

  async goToLogin(): Promise<void> {
    await Promise.all([this.page.waitForURL(/\/login/), this.loginNavLink.click()]);
  }

  async goToContactUs(): Promise<void> {
    await Promise.all([this.page.waitForURL(/\/contact_us/), this.contactUsNavLink.click()]);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveTitle(/Automation Exercise/);
    await expect(this.featuredProducts.first()).toBeVisible();
  }
}
