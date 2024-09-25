describe('about-page', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('should exit about page', () => {
    cy.get('button.top-bar__back').should('exist').click();
    cy.url().should('not.include', '/about');
  });
});
