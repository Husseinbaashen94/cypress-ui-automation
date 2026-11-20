const InventoryPage = require('../support/pages/InventoryPage');
const CartPage = require('../support/pages/CartPage');

describe('Cart', () => {
  beforeEach(() => {
    cy.loginAs('standard');
    InventoryPage.visit();
  });

  it('updates the badge as items are added and removed', () => {
    InventoryPage.cartBadge().should('not.exist');

    InventoryPage.addToCart('sauce-labs-backpack');
    InventoryPage.cartBadge().should('have.text', '1');

    InventoryPage.addToCart('sauce-labs-bike-light');
    InventoryPage.cartBadge().should('have.text', '2');

    InventoryPage.removeFromCart('sauce-labs-backpack');
    InventoryPage.cartBadge().should('have.text', '1');
  });

  it('shows the added items in the cart', () => {
    InventoryPage.addToCart('sauce-labs-backpack').addToCart('sauce-labs-onesie').openCart();

    cy.url().should('include', '/cart.html');
    CartPage.items().should('have.length', 2);
    CartPage.itemNames().then(($names) => {
      expect(Cypress._.map($names, 'innerText')).to.have.members([
        'Sauce Labs Backpack',
        'Sauce Labs Onesie',
      ]);
    });
  });

  it('keeps the cart after reloading the page', () => {
    InventoryPage.addToCart('sauce-labs-fleece-jacket');
    cy.reload();
    InventoryPage.cartBadge().should('have.text', '1');
  });

  it('returns to the product list from the cart', () => {
    InventoryPage.openCart();
    CartPage.continueShopping();
    cy.url().should('include', '/inventory.html');
  });
});
