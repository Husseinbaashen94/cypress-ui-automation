class CheckoutPage {
  fillCustomerInfo({ firstName, lastName, postalCode }) {
    if (firstName) cy.get('[data-test="firstName"]').type(firstName);
    if (lastName) cy.get('[data-test="lastName"]').type(lastName);
    if (postalCode) cy.get('[data-test="postalCode"]').type(postalCode);
    return this;
  }

  continue() {
    cy.get('[data-test="continue"]').click();
    return this;
  }

  finish() {
    cy.get('[data-test="finish"]').click();
    return this;
  }

  error() {
    return cy.get('[data-test="error"]');
  }

  itemPrices() {
    return cy.get('[data-test="inventory-item-price"]');
  }

  subtotal() {
    return cy.get('[data-test="subtotal-label"]');
  }

  tax() {
    return cy.get('[data-test="tax-label"]');
  }

  total() {
    return cy.get('[data-test="total-label"]');
  }

  completeHeader() {
    return cy.get('[data-test="complete-header"]');
  }
}

module.exports = new CheckoutPage();
