// import { it } from 'vitest';
import Quiz from '../../client/src/components/Quiz'

describe('Quiz', () => {
    beforeEach(() => {
        cy.mount(<Quiz />)
      });
    it('renders a quiz', () => {
        cy.get('.btn').should('exist');
        cy.get('.btn').should('be.visible');
    });
    // find the right start quiz button
    // click the start quiz button
    // check that the first question is displayed
    it('clicks the start quiz button', () => {
        cy.contains('Start Quiz').should('be.visible');
        cy.contains('Start Quiz').click();
        cy.get('.card h2').should('exist');
    });
//   answer the first question
    it('answers the first question', () => {
        cy.contains('Start Quiz').click();
        cy.get('.card h2').should('exist');
        cy.get('.btn-primary').first().click();
        cy.get('.card h2').should('exist');
    });
    // check is quiz is completed
    it('should display Quiz Completed after answering all questions', () => {
        cy.contains('Start Quiz').click();
        cy.get('.btn-primary').each((button) => {
        cy.wrap(button).click();
        });
        cy.contains('Quiz Completed').should('exist');
    });

// should restart the quiz after completion
it('should restart the quiz after completion', () => {
    cy.contains('Start Quiz').click();
    cy.get('.btn-primary').each((button) => {
    cy.wrap(button).click();
    });
    cy.contains('Take New Quiz').click();
    cy.get('.btn-primary').should('exist');

});
});

