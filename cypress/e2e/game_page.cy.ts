function mockRandomPeopleRequest(): void {
  let requestCount = 0;

  cy.intercept('GET', 'https://www.swapi.tech/api/people/*', (req) => {
    const fixtureFile = (requestCount++ % 2) === 1 ? 'person.json' : 'person-second.json';
    req.reply({ fixture: fixtureFile });
  }).as('getPerson');
}

function clickDrawButton(): void {
  cy.get('.button-container').find('button.button-primary')
    .contains('draw', { matchCase: false })
    .should('have.length', 1)
    .click();
}

function waitForResponses(): void {
  cy.wait('@getPerson').its('response.statusCode').should('eq', 200);
  cy.wait('@getPerson').its('response.statusCode').should('eq', 200);
}

describe('game-page', () => {
  beforeEach(() => {
    cy.visit('/game');
  });

  it('should load game page', () => {
    cy.url().should('include', '/game');
  });

  it('should redirect to game page for invalid link postfix', () => {
    cy.visit('/game/not%20game');
    cy.url().should('include', '/game');
  });

  it('should not redirect to game when entering non-prefixed URL', () => {
    cy.visit('/not%20game');
    cy.url().should('not.include', '/game');
  });

  it('should exit game page', () => {
    cy.get('button.top-bar__back').should('exist').click();
    cy.url().should('not.include', '/game');
  });

  describe('game-page content', () => {
    it('should display game page content and overlay', () => {
      cy.get('app-top-bar').should('be.visible');
      cy.get('app-background-stars').should('exist');
      cy.get('.button-container').find('button.button-primary')
        .contains('Draw', { matchCase: false })
        .should('have.length', 1);
      cy.get('app-point-counter').should('exist');
      cy.get('div.cards-container').should('exist');
      cy.get('app-settings-menu').should('exist');
      cy.get('app-winner-poster').should('exist');
    });

    it('should draw 2 champions', () => {
      mockRandomPeopleRequest();
      clickDrawButton();
      waitForResponses();

      const cards = cy.get('div.cards-container').find('app-champion-card');

      cards.should('have.length', 2);
      cards.should('contain.text', 'C-3PO')
        .and('contain.text', 'BMI 32.3')
        .and('contain.text', 'H 167')
        .and('contain.text', 'M 90')
        .and('contain.text', 'Luke Skywalker')
        .and('contain.text', 'BMI 26')
        .and('contain.text', 'H 172')
        .and('contain.text', 'M 77');

      cy.get('.button-container').find('button.button-primary')
        .should('have.length', 1)
        .contains('draw', { matchCase: false });
    });

    it('should handle settings selection with visual feedback', () => {
      cy.get('div.menu__container').should('have.class', 'menu--hidden').should('exist');
      cy.get('button.settings__button').click();

      cy.get('div.menu__container')
        .should('not.have.class', 'menu--hidden')
        .and('have.class', 'menu--visible');

      cy.get('div.menu__container').find('button').contains('Mass').filter(':has(mat-icon)').should('exist');
      cy.get('div.menu__container').find('button').contains('Height').filter(':not(:has(mat-icon))').should('exist').click();
      cy.get('div.menu__container').find('button').contains('Mass').filter(':not(:has(mat-icon))').should('exist');

      cy.get('app-winner-poster').click();
      cy.get('div.menu__container')
        .should('not.have.class', 'menu--visible')
        .and('have.class', 'menu--hidden');
    });

    it('simple draw updates score based on mass', () => {
      mockRandomPeopleRequest();
      clickDrawButton();

      cy.wait(['@getPerson', '@getPerson']).then(([firstResults, secondResults]) => {
        const firstMass = firstResults.response?.body.result.properties.mass;
        const secondMass = secondResults.response?.body.result.properties.mass;

        if (firstMass > secondMass) {
          cy.get('.counter--left').should('contain.text', 1);
          cy.get('.counter--right').should('contain.text', 0);
        } else {
          cy.get('.counter--left').should('contain.text', 0);
          cy.get('.counter--right').should('contain.text', 1);
        }
      });
    });

    it('changing calculation base in settings affects result', () => {
      mockRandomPeopleRequest();
      clickDrawButton();

      cy.wait(['@getPerson', '@getPerson']).then(([firstResults, secondResults]) => {
        const firstMass = firstResults.response?.body.result.properties.mass;
        const secondMass = secondResults.response?.body.result.properties.mass;

        const leftPoints = +(firstMass > secondMass);
        const rightPoints = 1 - leftPoints;

        cy.get('div.counter__container--standard span.counter--left').should('contain.text', leftPoints);
        cy.get('div.counter__container--standard span.counter--right').should('contain.text', rightPoints);

        cy.get('button.settings__button').click();
        cy.get('div.menu__container').find('button').contains('Height').filter(':not(:has(mat-icon))').click();

        clickDrawButton();

        cy.wait(['@getPerson', '@getPerson']).then(([firstResults2, secondResults2]) => {
          const firstHeight = firstResults2.response?.body.result.properties.height;
          const secondHeight = secondResults2.response?.body.result.properties.height;

          const newLeftPoints = leftPoints + +(firstHeight > secondHeight);
          const newRightPoints = 2 - newLeftPoints;

          cy.get('div.counter__container--standard span.counter--left').should('contain.text', newLeftPoints);
          cy.get('div.counter__container--standard span.counter--right').should('contain.text', newRightPoints);
        });
      });
    });
  });
});
