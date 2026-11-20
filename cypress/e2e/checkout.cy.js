const InventoryPage = require('../support/pages/InventoryPage');
const CartPage = require('../support/pages/CartPage');
const CheckoutPage = require('../support/pages/CheckoutPage');

describe('Checkout', () => {
  let customer;

  before(() => {
    cy.fixture('users').then((users) => {
      customer = users.customer;
    });
  });

  beforeEach(() => {
    cy.loginAs('standard');
    InventoryPage.visit();
    InventoryPage.addToCart('sauce-labs-backpack').addToCart('sauce-labs-bolt-t-shirt').openCart();
    CartPage.checkout();
  });

  it('completes an order end to end', () => {
    CheckoutPage.fillCustomerInfo(customer).continue();
    cy.url().should('include', '/checkout-step-two.html');
    CheckoutPage.finish();
    CheckoutPage.completeHeader().should('have.text', 'Thank you for your order!');
    InventoryPage.cartBadge().should('not.exist');
  });

  it('calculates subtotal, tax and total correctly', () => {
    CheckoutPage.fillCustomerInfo(customer).continue();

    CheckoutPage.itemPrices()
      .pricesFrom()
      .then((prices) => {
        const expectedSubtotal = Cypress._.sum(prices);

        CheckoutPage.subtotal()
          .pricesFrom()
          .then(([subtotal]) => {
            expect(subtotal).to.be.closeTo(expectedSubtotal, 0.001);
          });

        CheckoutPage.tax()
          .pricesFrom()
          .then(([tax]) => {
            CheckoutPage.total()
              .pricesFrom()
              .then(([total]) => {
                expect(total).to.be.closeTo(expectedSubtotal + tax, 0.001);
              });
          });
      });
  });

  const requiredFields = [
    { missing: 'first name', info: { lastName: 'Tester', postalCode: '50450' }, message: 'First Name is required' },
    { missing: 'last name', info: { firstName: 'Hussein', postalCode: '50450' }, message: 'Last Name is required' },
    { missing: 'postal code', info: { firstName: 'Hussein', lastName: 'Tester' }, message: 'Postal Code is required' },
  ];

  requiredFields.forEach(({ missing, info, message }) => {
    it(`requires a ${missing}`, () => {
      CheckoutPage.fillCustomerInfo(info).continue();
      CheckoutPage.error().should('contain.text', message);
    });
  });
});
