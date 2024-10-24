
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

    it('should loop through 10 questions and click the first answer', () => {
      cy.contains('Start Quiz').click();
    
      // Loop through 10 questions
      for (let i = 1; i <= 3; i++) {
        cy.get('.btn-primary').first().click();
          cy.wait(500);  
      }
      // Check if score is displayed after all questions
      cy.get('.alert.alert-success').should('be.visible');
    });
    

    it('should show score', () => {
      cy.contains('Start Quiz').click();
      for (let i = 1; i <= 3; i++) {
        cy.get('.btn-primary').first().click();
      }
      cy.get('.alert.alert-success').should('be.visible');
    });

    it('should show Take New Quiz button', () => {
      cy.contains('Start Quiz').click();
      for (let i = 1; i <= 3; i++) {
        cy.get('.btn-primary').first().click();
      }
      cy.get('.btn-primary').contains('Take New Quiz').should('be.visible');
    });

    it('should be able to click Take New Quiz button', () => {
      cy.contains('Start Quiz').click();
      for (let i = 1; i <= 3; i++) {
        cy.get('.btn-primary').first().click();
      }
      cy.get('.btn-primary').contains('Take New Quiz').click();
      cy.get('.card h2').should('exist');
    });
  });
});