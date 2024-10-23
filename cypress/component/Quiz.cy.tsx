
import Quiz from '../../client/src/components/Quiz';



describe('Quiz component', () => {
    beforeEach(() => {
      cy.mount(<Quiz />)
    })
    it('renders a quiz', () => {
        cy.get('.btn').should('exist');
        cy.get('.btn').should('be.visible');
    });

    // click the start quiz button
    // check that the first question is displayed
    it('clicks the start quiz button', () => {
        cy.contains('Start Quiz').should('be.visible');
        cy.contains('Start Quiz').click();
        cy.get('.card').should('be.visible');
    });

    it('should start the quiz and display the first question', () => {
        cy.intercept('GET', 'http://localhost:3000/api/questions').as('getRandomQuestion');
    
        // Click "Start Quiz" button
        cy.get('button').contains('Start Quiz').click();
    
        // Check if the first question is visible
        cy.get('.card h2').should('exist');

      });
   

    // it should display 4 buttons for mulitple choice 
    it('should display 4 buttons for multiple choice', () => {
        cy.contains('Start Quiz').click();
        cy.get('.btn-primary').should('have.length', 4);
    }
    );

});
