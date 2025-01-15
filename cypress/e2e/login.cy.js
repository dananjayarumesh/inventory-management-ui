describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should successfully login with valid credentials', () => {
    cy.intercept('POST', '**/auth/login', {
      statusCode: 200,
      body: {
        data: {
          access_token: 'fakeAccessToken',
        },
      },
    }).as('loginRequest');

    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');

    cy.get('form').submit();
    cy.wait('@loginRequest');

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    // cy.window().then((win) => {
    //   expect(win.localStorage.getItem('accessToken')).to.equal('fakeAccessToken');
    // });
  });

  it('should display error message with invalid credentials', () => {
    cy.intercept('POST', '**/auth/login', {
      statusCode: 400,
      body: {
        error: 'Invalid email or password',
      },
    }).as('loginRequest');

    cy.get('input[name="email"]').type('wronguser@example.com');
    cy.get('input[name="password"]').type('wrongpassword');

    cy.get('form').submit();

    cy.wait('@loginRequest');

    cy.get('.text-red-500').should('contain', 'Invalid email or password');
  });

  it.skip('should show loading spinner while logging in', () => {
    cy.intercept('POST', '**/auth/login', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            access_token: 'fakeAccessToken',
          },
        },
      }).delay(1000); 
    }).as('loginRequest');

    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');

    cy.get('form').submit();

    cy.get('button[type="submit"]').should('be.disabled');

    cy.wait('@loginRequest');

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});
