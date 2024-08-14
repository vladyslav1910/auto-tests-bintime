import urls from './config/urls';
import checkBox from '../support/selectors/checkBox';

describe('Check Box Tests', () => {
  beforeEach(() => {
    cy.visit(urls.checkBoxPage);
    cy.contains(checkBox.titleCheckBox, 'Check Box').should('be.visible');
  });

  it('Check that the "Home" checkbox is not selected by default', () => {
    cy.get(checkBox.homeCheckbox).should('not.be.checked');
  });

  it('Check that after clicking on the "+" button the whole hierarchy of checkboxes is opened', () => {
    cy.get(checkBox.expandAllBtn).should('be.visible').click();
    cy.get(checkBox.homeCheckbox).should('have.length', 17);
  });

  it('Check that after clicking the "-" button, the entire checkbox hierarchy is closed', () => {
    cy.get(checkBox.expandAllBtn).should('be.visible').click();
    cy.get(checkBox.homeCheckbox).should('have.length', 17);
    cy.get(checkBox.collapseAllBtn).should('be.visible').click();
    cy.get(checkBox.homeCheckbox).should('have.length', 1);
  });

  it('Check that after enabling the "Home" checkbox, the text with all selected checkboxes in the hierarchy is displayed', () => {
    cy.get(checkBox.expandAllBtn).should('be.visible').click();
    cy.get(checkBox.homeCheckbox).should('have.length', 17);
    cy.get(checkBox.clickOnCheckbox).eq(0).should('be.visible').click();
    
    cy.get(checkBox.homeCheckbox).should('have.length', 17).each(($checkbox) => {
        cy.wrap($checkbox).should('be.checked');
      });
  });
});
