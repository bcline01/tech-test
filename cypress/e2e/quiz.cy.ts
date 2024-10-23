
describe('Quiz flow', () => {
  context('begin from Start Quiz button', () => {
    beforeEach(() => {
      // Intercept the API call
      cy.fixture('questions').then((fixture) => {
        cy.intercept('GET', '/api/questions/random', {
          statusCode: 200,
          body: fixture,
        }).as('getRandomQuestions');
      });

      // Visit the landing page
      cy.visit('/');
    });

    it('should display the Start Quiz button', () => {
      cy.contains('Start Quiz').should('exist');
    });

    it('should display the first question after clicking Start Quiz', () => {
      cy.contains('Start Quiz').click();
      cy.get('.card h2').should('exist');
    });

    it('should loop through all questions and click the fist answer', () => {
      cy.contains('Start Quiz').click();
      cy.get('.btn-primary').should('have.length', 4);
      cy.get('.btn-primary').first().click();
  });

  it('should show score', () => {
    cy.contains('Start Quiz').click();
    cy.get('.btn-primary').should('have.length', 4);
    cy.get('.btn-primary').first().click();
    cy.get('.alert.alert-success').should('be.visible');
});
it('should show Take New Quiz button', () => {
  cy.contains('Start Quiz').click();
  cy.get('.btn-primary').should('have.length', 4);
  cy.get('.btn-primary').first().click();
  cy.get('.btn-primary').contains('Take New Quiz').should('be.visible');
  });
  it('should be able to click Take New Quiz button', () => {
    cy.contains('Start Quiz').click();
    cy.get('.btn-primary').should('have.length', 4);
    cy.get('.btn-primary').first().click();
    cy.get('.btn-primary').contains('Take New Quiz').click();
    cy.get('.card h2').should('exist');
  });
});
});

