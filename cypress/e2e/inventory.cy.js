const InventoryPage = require('../support/pages/InventoryPage');

describe('Inventory', () => {
  beforeEach(() => {
    cy.loginAs('standard');
    InventoryPage.visit();
  });

  it('lists all six products', () => {
    InventoryPage.items().should('have.length', 6);
  });

  it('sorts products by name Z to A', () => {
    InventoryPage.sortBy('za');
    InventoryPage.itemNames().then(($names) => {
      const names = Cypress._.map($names, 'innerText');
      expect(names).to.deep.equal([...names].sort().reverse());
    });
  });

  it('sorts products by price low to high', () => {
    InventoryPage.sortBy('lohi');
    InventoryPage.itemPrices()
      .pricesFrom()
      .then((prices) => {
        expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
      });
  });

  it('sorts products by price high to low', () => {
    InventoryPage.sortBy('hilo');
    InventoryPage.itemPrices()
      .pricesFrom()
      .then((prices) => {
        expect(prices).to.deep.equal([...prices].sort((a, b) => b - a));
      });
  });

  it('opens a product detail page', () => {
    InventoryPage.itemNames().first().invoke('text').then((name) => {
      InventoryPage.itemNames().first().click();
      cy.url().should('include', '/inventory-item.html');
      cy.get('[data-test="inventory-item-name"]').should('have.text', name);
    });
  });
});
