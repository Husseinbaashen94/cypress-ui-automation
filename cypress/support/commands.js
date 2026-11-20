const LoginPage = require('./pages/LoginPage');

/**
 * Logs in through the UI once per user and caches the session,
 * so tests that aren't about login skip the login screen.
 */
Cypress.Commands.add('loginAs', (userKey = 'standard') => {
  cy.fixture('users').then((users) => {
    const username = users[userKey];
    cy.session(
      username,
      () => {
        LoginPage.visit().login(username, users.password);
        cy.url().should('include', '/inventory.html');
      },
      {
        validate() {
          cy.getCookie('session-username').should('exist');
        },
      },
    );
  });
});

/** Parses "$29.99" / "Item total: $29.99" into a number. */
Cypress.Commands.add('pricesFrom', { prevSubject: true }, ($els) =>
  Cypress._.map($els, (el) => Number(el.innerText.replace(/[^0-9.]/g, ''))),
);
