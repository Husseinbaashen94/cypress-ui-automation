class CartPage {
  items() {
    return cy.get('[data-test="inventory-item"]');
  }

  itemNames() {
    return cy.get('[data-test="inventory-item-name"]');
  }

  checkout() {
    cy.get('[data-test="checkout"]').click();
    return this;
  }

  continueShopping() {
    cy.get('[data-test="continue-shopping"]').click();
    return this;
  }
}

module.exports = new CartPage();
