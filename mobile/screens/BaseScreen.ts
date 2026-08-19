import { browser } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';

export abstract class BaseScreen {
  protected baseUrl(): string {
    return process.env.MOBILE_BASE_URL || 'https://automationexercise.com';
  }

  async open(path: string = '/'): Promise<void> {
    await browser.url(`${this.baseUrl()}${path}`);
    await this.waitForLoad();
  }

  async waitForLoad(): Promise<void> {
    await browser.waitUntil(
      async () => (await browser.execute(() => document.readyState)) === 'complete',
      { timeout: 15000, timeoutMsg: 'Page did not finish loading in time' }
    );
  }

  async title(): Promise<string> {
    return browser.getTitle();
  }

  /**
   * Chrome-on-Android sometimes overlays a floating Google annotation/
   * translate chip that intercepts native taps on fixed-position controls.
   * Dispatching the click via JS bypasses that overlay instead of failing
   * with "element click intercepted".
   */
  protected async clickViaJs(element: ChainablePromiseElement): Promise<void> {
    const resolved = await element;
    await browser.execute((el: HTMLElement) => el.click(), resolved);
  }
}
