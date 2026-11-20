class LoginPage {
  visit() {
    cy.visit('/');
    return this;
  }

  username() {
    return cy.get('[data-test="username"]');
  }

  password() {
    return cy.get('[data-test="password"]');
  }

  submit() {
    return cy.get('[data-test="login-button"]');
  }

  error() {
    return cy.get('[data-test="error"]');
  }

  login(username, password) {
    if (username) this.username().type(username);
    if (password) this.password().type(password, { log: false });
    this.submit().click();
    return this;
  }
}

module.exports = new LoginPage();
