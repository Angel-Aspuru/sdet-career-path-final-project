# Mobile Automation — Appium + WebdriverIO

5 mobile specs covering the same [automationexercise.com](https://automationexercise.com) scenarios as the web suite, but driven through **Chrome on an Android emulator via Appium**, using a Screen-object Page Object Model (`screens/`).

Playwright cannot drive Appium sessions, so this is a separate, independent npm project with its own `package.json`/`node_modules` — WebdriverIO + Appium is the standard pairing for this stack.

## Why mobile *web* and not a native app

To keep the whole capstone project pointed at one target site (per the project's own constraint), the mobile suite automates the site's mobile web view rather than a separate demo native app. This still exercises every module-07 topic: Appium/ADB/emulator environment setup, locators & gestures, mobile-specific interrupts, a mobile Page Object Model, and screenshot/diagnostics on failure — the transport (`browserName: 'Chrome'` instead of a native `app` capability) is the only difference from a native-app suite.

## Environment setup (manual — do this once)

This can't be scripted the way `npx playwright install` is; it requires local Android tooling.

1. **Install Android Studio** and, through its SDK Manager, install:
   - Android SDK Platform-Tools (provides `adb`)
   - An Android SDK Platform (e.g. API 33+)
   - Android Emulator + at least one system image
2. **Set environment variables** (add to your shell profile):
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk   # or %LOCALAPPDATA%\Android\Sdk on Windows
   export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator
   ```
3. **Create an AVD** (Android Virtual Device) via Android Studio's Device Manager, or:
   ```bash
   avdmanager create avd -n Pixel_6_Pro -k "system-images;android-33;google_apis;x86_64"
   ```
4. **Install Appium and the UiAutomator2 driver**:
   ```bash
   npm install -g appium
   appium driver install uiautomator2
   ```
5. **Start the emulator**:
   ```bash
   emulator -avd Pixel_6_Pro
   ```
   Wait for it to fully boot (`adb devices` should show it as `device`, not `offline`).
6. **Start the Appium server** in its own terminal, with automatic Chromedriver downloads enabled (needed because the emulator's bundled Chrome version changes over time):
   ```bash
   appium --allow-insecure uiautomator2:chromedriver_autodownload
   ```

## Running the tests

Once the emulator is running and Appium is listening on `127.0.0.1:4723`:

```bash
npm install
npm test
```

`wdio.conf.ts` points directly at that already-running Appium server (`hostname`/`port`) rather than managing its lifecycle itself, matching the "start it yourself" setup above. Override the device name or Appium host/port via env vars if needed: `ANDROID_DEVICE_NAME`, `APPIUM_HOST`, `APPIUM_PORT`, `MOBILE_BASE_URL`.

## Notes from building this against a real emulator

- **WebDriver BiDi vs classic**: WebdriverIO v9 defaults to the BiDi protocol, which Appium's mobile Chrome sessions don't yet implement (`browsingContext.navigate` errors). The capability `'wdio:enforceWebDriverClassic': true` in `wdio.conf.ts` forces classic WebDriver and fixes this.
- **Mobile-specific interrupts**: the live site injects ad iframes and a floating Google annotation chip that frequently overlap header links, search/submit buttons, and modal links on a phone-sized viewport, causing "element click intercepted" errors on a native tap — a real instance of the path's "Mobile-Specific Scenarios / handling interrupts" topic. `screens/BaseScreen.ts` exposes `clickViaJs()`, which dispatches the click via `element.click()` in-page instead of a native tap, bypassing the overlay; every screen click goes through it.
- **Diagnostics on failure**: `wdio.conf.ts`'s `afterTest` hook saves a screenshot and the full page-source XML for any failing test under `mobile/diagnostics/` — Appium's equivalent of Playwright's trace, since WebdriverIO/Appium has no built-in trace viewer.
