const LoginPage = require('../support/pages/LoginPage');
const InventoryPage = require('../support/pages/InventoryPage');

describe('Login', () => {
  let users;

  before(() => {
    cy.fixture('users').then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    LoginPage.visit();
  });

  it('logs in with valid credentials', () => {
    LoginPage.login(users.standard, users.password);
    cy.url().should('include', '/inventory.html');
    InventoryPage.title().should('have.text', 'Products');
  });

  it('blocks a locked-out user', () => {
    LoginPage.login(users.lockedOut, users.password);
    LoginPage.error().should('contain.text', 'Sorry, this user has been locked out.');
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  });

  it('rejects a wrong password', () => {
    LoginPage.login(users.standard, 'wrong_password');
    LoginPage.error().should(
      'contain.text',
      'Username and password do not match any user in this service',
    );
  });

  const missingFields = [
    { case: 'username', username: '', password: 'secret_sauce', message: 'Username is required' },
    { case: 'password', username: 'standard_user', password: '', message: 'Password is required' },
  ];

  missingFields.forEach(({ case: field, username, password, message }) => {
    it(`requires a ${field}`, () => {
      LoginPage.login(username, password);
      LoginPage.error().should('contain.text', message);
    });
  });

  it('prevents opening the inventory without logging in', () => {
    cy.visit('/inventory.html', { failOnStatusCode: false });
    LoginPage.error().should('contain.text', "You can only access '/inventory.html' when you are logged in.");
  });

  it('logs out and returns to the login screen', () => {
    LoginPage.login(users.standard, users.password);
    InventoryPage.logout();
    LoginPage.submit().should('be.visible');
    cy.getCookie('session-username').should('not.exist');
  });
});
