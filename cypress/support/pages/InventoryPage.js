class InventoryPage {
  visit() {
    // Sauce Demo is a SPA: deep links return HTTP 404 but the app still renders.
    cy.visit('/inventory.html', { failOnStatusCode: false });
    return this;
  }

  title() {
    return cy.get('[data-test="title"]');
  }

  items() {
    return cy.get('[data-test="inventory-item"]');
  }

  itemNames() {
    return cy.get('[data-test="inventory-item-name"]');
  }

  itemPrices() {
    return cy.get('[data-test="inventory-item-price"]');
  }

  sortBy(option) {
    // option: az | za | lohi | hilo
    cy.get('[data-test="product-sort-container"]').select(option);
    return this;
  }

  addToCart(productSlug) {
    cy.get(`[data-test="add-to-cart-${productSlug}"]`).click();
    return this;
  }

  removeFromCart(productSlug) {
    cy.get(`[data-test="remove-${productSlug}"]`).click();
    return this;
  }

  cartBadge() {
    return cy.get('[data-test="shopping-cart-badge"]');
  }

  openCart() {
    cy.get('[data-test="shopping-cart-link"]').click();
    return this;
  }

  logout() {
    cy.get('#react-burger-menu-btn').click();
    cy.get('[data-test="logout-sidebar-link"]').click();
    return this;
  }
}

module.exports = new InventoryPage();
