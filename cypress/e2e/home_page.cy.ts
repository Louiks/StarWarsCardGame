describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the home page', () => {
    cy.url().should('include', '/home');
  });

  it('should redirect to home when visiting an invalid link', () => {
    cy.visit('/invalid%20link');
    cy.url().should('include', '/home');
  });

  it('should not redirect to home when visiting other valid pages', () => {
    cy.visit('/game');
    cy.url().should('include', '/game').and('not.include', '/home');
  });

  describe('Home Page Functionality', () => {
    beforeEach(() => {
      cy.visit('/home');
    });

    it('should display homepage content and overlay', () => {
      cy.get('app-top-bar').should('be.visible');
      cy.get('app-background-stars').should('exist');
      cy.get('.button__container button.button-primary').should('have.length', 3);
    });

    it('should navigate to the game page', () => {
      cy.get('.button__container button.button-primary').contains('Play').click();
      cy.url().should('not.include', '/home');
    });

    it('should navigate to the how to play page', () => {
      cy.get('.button__container button.button-primary').contains('How to play').click();
      cy.url().should('not.include', '/home');
    });

    it('should navigate to the about page', () => {
      cy.get('.button__container button.button-primary').contains('About').click();
      cy.url().should('not.include', '/home');
    });
  });
});
