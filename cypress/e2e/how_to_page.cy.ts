describe('/how-to-play-page', () => {
  beforeEach(() => {
    cy.visit('/how-to-play');
  });

  it('should exit how-to-play page', () => {
    cy.get('button.top-bar__back').should('exist').click();
    cy.url().should('not.include', '/how-to-play');
  });
});
