# Cypress UI Automation

![Cypress UI Tests](https://github.com/Husseinbaashen94/cypress-ui-automation/actions/workflows/ci.yml/badge.svg)
![Cypress](https://img.shields.io/badge/Cypress-JavaScript-17202C?logo=cypress)

End-to-end UI test suite for [Sauce Demo](https://www.saucedemo.com), a public e-commerce practice site, built with **Cypress** and the **Page Object Model**.

> Part of a series that tests the same app with different stacks:
> [Cypress](https://github.com/Husseinbaashen94/cypress-ui-automation) ·
> [Playwright](https://github.com/Husseinbaashen94/playwright-ui-automation) ·
> [Java + Cucumber](https://github.com/Husseinbaashen94/java-cucumber-ui-automation)

## What's covered

| Area | Scenarios |
|------|-----------|
| **Login** | valid login · locked-out user · wrong password · required-field validation · direct-URL access blocked · logout clears session |
| **Inventory** | product count · sort by name Z→A · sort by price ↑ and ↓ · product detail page |
| **Cart** | badge count on add/remove · cart contents · cart survives reload · continue shopping |
| **Checkout** | full order flow · subtotal + tax = total maths check · required-field validation (data-driven) |

## Design decisions

- **Page Object Model.** Selectors live in `cypress/support/pages`, so a UI change is fixed in one place.
- **Stable selectors.** Only `data-test` attributes are used, never CSS classes or text that designers might change.
- **Fast, isolated tests.** `cy.loginAs()` logs in once per user with `cy.session()` and reuses the cookie. Only the login specs exercise the login screen.
- **Data-driven negatives.** Validation cases are table-driven, so adding a case is one line.
- **Assertions on behaviour, not snapshots.** Sorting is verified by comparing against a sorted copy of what's on screen, and totals by summing the line items.
- **Flake control.** One retry in CI only (`runMode: 1`). Locally a flaky test fails loudly.

## Project structure

```
cypress/
├── e2e/                 # specs: login, inventory, cart, checkout
├── fixtures/users.json  # test users and customer data
└── support/
    ├── commands.js      # cy.loginAs(), .pricesFrom()
    └── pages/           # Page Objects
cypress.config.js        # base URL, retries, HTML reporter
.github/workflows/ci.yml # Chrome / Firefox / Electron matrix
```

## Run it

Requires Node.js 18+.

```bash
npm install
npm test                 # headless, Electron
npm run test:chrome      # headless, Chrome
npm run cy:open          # interactive runner
```

An HTML report with embedded failure screenshots is written to `cypress/reports/index.html`.

## CI

GitHub Actions runs the suite on every push and pull request, plus a weekly schedule, across **Chrome, Firefox and Electron**. The HTML report for each browser is uploaded as a build artifact.
