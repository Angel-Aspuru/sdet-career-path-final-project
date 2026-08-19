import type { Options } from '@wdio/types';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = process.env.MOBILE_BASE_URL || 'https://automationexercise.com';
const DEVICE_NAME = process.env.ANDROID_DEVICE_NAME || 'Pixel_6_Pro';

const DIAGNOSTICS_DIR = path.join(__dirname, 'diagnostics');

export const config: Options.Testrunner = {
  runner: 'local',
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: './tsconfig.json',
    },
  },

  specs: ['./tests/**/*.spec.ts'],
  maxInstances: 1,

  // Appium server is started manually (see mobile/README.md) and is expected
  // to already be listening here before `npm test` runs.
  hostname: process.env.APPIUM_HOST || '127.0.0.1',
  port: Number(process.env.APPIUM_PORT) || 4723,

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': DEVICE_NAME,
      browserName: 'Chrome',
      'appium:newCommandTimeout': 240,
      // Appium's mobile Chrome sessions don't yet support WebDriver BiDi
      // (used by default in WebdriverIO v9+), so force classic WebDriver.
      'wdio:enforceWebDriverClassic': true,
    },
  ],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 15000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
  },

  reporters: ['spec'],

  // Path topic: "Screenshot & Diagnostics on Failure" — capture screenshot +
  // page source XML for any failing test, saved under mobile/diagnostics/.
  afterTest: async function (test, _context, { passed }) {
    if (passed) return;

    fs.mkdirSync(DIAGNOSTICS_DIR, { recursive: true });
    const safeName = `${test.parent}-${test.title}`.replace(/[^a-z0-9-_]+/gi, '_');

    await browser.saveScreenshot(path.join(DIAGNOSTICS_DIR, `${safeName}.png`));

    const source = await browser.getPageSource();
    fs.writeFileSync(path.join(DIAGNOSTICS_DIR, `${safeName}.xml`), source);
  },

  before: function () {
    (global as any).BASE_URL = BASE_URL;
  },
};
