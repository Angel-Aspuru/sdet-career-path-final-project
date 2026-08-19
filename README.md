# SDET Career Path — Final Project

Capstone project for the [SDET Career Path](https://coe-qa-unosquare.github.io/guides/sdet-career-path.html) training. It demonstrates Front-end automation, API automation, OOP/Page Object Model, Git/GitHub, CI/CD (GitHub Actions) and Mobile automation (Appium) — all against one target, [automationexercise.com](https://automationexercise.com), which is free and provides both a full e-commerce UI and a documented REST API (`/api_list`).

## Project layout

```
src/
  pages/       Web Page Object Model classes (BasePage + concrete pages)
  api/         Typed ApiClient wrapping the REST endpoints, request/response types, JSON schema
  fixtures/    Custom Playwright fixtures injecting page objects / the ApiClient
  utils/       Shared test-data builders
tests/
  web/         5 UI specs (Playwright + Chromium)
  api/         5 API specs (Playwright's request context)
mobile/        Independent WebdriverIO + Appium project — 5 mobile-web specs, own README
.github/workflows/tests.yml   CI: runs the web + API suite on every PR
```

## Prerequisites

- Node.js 20+
- npm

## Setup

```bash
npm install
npx playwright install --with-deps chromium
cp .env.example .env
```

`.env` defaults already point at the public site — you only need to edit it if you want to point at a different environment.

## Running the tests

```bash
npm test              # everything (web + api)
npm run test:web      # 5 UI tests only
npm run test:api      # 5 API tests only
npm run report         # open the last HTML report
```

Every run captures a screenshot, video, and Playwright trace for any failing test (`playwright.config.ts` → `use.trace: 'retain-on-failure'`, `use.screenshot: 'only-on-failure'`). Open a trace with:

```bash
npx playwright show-trace test-results/<failing-test-folder>/trace.zip
```

## API notes

`automationexercise.com`'s API always answers with HTTP 200 — the real result is encoded in the JSON body's `responseCode` field. `src/api/ApiClient.ts` and every API test assert on that field, not on the transport status code.

## CI/CD

`.github/workflows/tests.yml` runs the web + API suite on every pull request targeting `main`:

- Config/secrets (`BASE_URL`, `API_BASE_URL`) are supplied as `env` sourced from `secrets.*` — never hardcoded in the YAML.
- The HTML report is uploaded as a build artifact on every run (`if: always()`), so it's downloadable even when tests fail.
- The job fails whenever any test fails (Playwright's default non-zero exit code) — nothing is silenced or ignored.

To enable it on your fork/repo, add repository secrets `BASE_URL` and `API_BASE_URL` (Settings → Secrets and variables → Actions) set to `https://automationexercise.com`. The suite also runs fine without them since the config falls back to that same default.

## Mobile automation

See [`mobile/README.md`](mobile/README.md) — Appium + WebdriverIO against the same site's mobile web view, with the required environment setup (Android SDK, emulator, Appium server) documented there since it can't be automated the way `npx playwright install` is.
