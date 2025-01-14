// cypress/e2e/sample.cy.js

describe('Sample Test', () => {
  it('Visits the Cypress Documentation Page', () => {
    // Visit the Cypress official documentation
    cy.visit('https://docs.cypress.io');

    // Assert that the page title includes "Cypress"
    cy.title().should('include', 'Cypress');
  });
});