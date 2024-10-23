// import { it } from 'vitest';
// import { mount } from 'cypress/react18';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz', () => {
    beforeEach(() => {
        cy.intercept({
            method: 'GET',
            url: '/api/questions/random'
          },
          {
            fixture: 'questions.json',
            statusCode: 200
          }
          ).as('getRandomQuestion')
        });
        
      });
    it('renders a quiz', () => {
        cy.mount(<Quiz />);
        cy.get('.btn').should('exist');
        cy.get('.btn').should('be.visible');
    });
    // find the right start quiz button
    // click the start quiz button
    // check that the first question is displayed
    it('clicks the start quiz button', () => {
        cy.mount(<Quiz />);
        cy.contains('Start Quiz').should('be.visible');
        cy.contains('Start Quiz').click();
        cy.get('.card').should('be.visible');
    });

//   answer the first question
    it('answers the first question', () => {
        cy.mount(<Quiz />);
        cy.wait('@getRandomQuestion').then((intercept) => {

        cy.contains('Start Quiz').click();
        cy.get('.card h2').should('exist');
        cy.get('.btn-primary').first().click();
        cy.get('.card h2').should('exist');

    });
    });
    // check is quiz is completed
    it('should display Quiz Completed after answering all questions', () => {
        cy.mount(<Quiz />);
        cy.contains('Start Quiz').click();
        cy.get('.btn-primary').each((button) => {
        cy.wrap(button).click();
        });
        cy.contains('Quiz Completed').should('exist');
    });

// should restart the quiz after completion
it('should restart the quiz after completion', () => {
    cy.mount(<Quiz />);
    cy.contains('Start Quiz').click();
    cy.get('.btn-primary').each((button) => {
    cy.wrap(button).click();
    });
    cy.contains('Take New Quiz').click();
    cy.get('.btn-primary').should('exist');

});


