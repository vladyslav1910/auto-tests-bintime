import urls from './config/urls';
import textBox from '../support/selectors/textBox';

const userData = {
  userName: 'Test Name',
  userEmail: 'test12345@example.com',
  userCurrentAddress: '123 Test St',
  userPermanentAddress: '456 Another St'
};

describe('Text Box Tests', () => {
  beforeEach(() => {
    cy.visit(urls.textBoxPage);
    cy.contains(textBox.titleTextBox, 'Text Box').should('be.visible');
  });

  // No field validation
  it.skip('Check validation of the "Email" field', () => {
    const invalidEmails = [
      '', // Empty email field
      'user@domain', // Email without dots in the domain part
      'user@domain@com', // Absence of @ in email
      'user @domain.com', // Email with spaces in the account name
      'user@domain .com', // Email with spaces in the domain part
      '@example.com', // Email without account name
      'user@.com', // Email without domain part
      'user@domain.americanexpress' // Incorrect first-level domain (if this is invalid)
    ];

    invalidEmails.forEach(email => {
      cy.get(textBox.userEmailInput).clear().type(email);
      cy.get(textBox.submitButton).should('be.visible').click();
      cy.get(textBox.errorMessage).should('be.visible');
    });
  });

  it('Check that user can create "Text Box" only with "Full Name" field', () => {
    cy.get(textBox.fullNameInput).type(userData.userName);
    cy.get(textBox.submitButton).should('be.visible').click();
    cy.get(textBox.nameIsDisplayed)
      .should('exist')
      .and('be.visible')
      .and('have.text', `Name:${userData.userName}`);
  });

  it('Check that user can create "Text Box" only with "Email" field', () => {
    cy.get(textBox.userEmailInput).type(userData.userEmail);
    cy.get(textBox.submitButton).should('be.visible').click();
    cy.get(textBox.emailIsDisplayed)
      .should('exist')
      .and('be.visible')
      .and('have.text', `Email:${userData.userEmail}`);
  });

  it('Check that user can create "Text Box" only with "Current Address" field', () => {
    cy.get(textBox.currentAddressInput).type(userData.userCurrentAddress);
    cy.get(textBox.submitButton).should('be.visible').click();
    cy.get(textBox.currentAddressOutput)
      .eq(1)
      .should('exist')
      .and('be.visible')
      .and('have.text', `Current Address: ${userData.userCurrentAddress}`);
  });

  it('Check that user can create "Text Box" only with "Permanent Address" field', () => {
    cy.get(textBox.permanentAddressInput).type(userData.userPermanentAddress);
    cy.get(textBox.submitButton).should('be.visible').click();
    cy.get(textBox.permanentAddressOutput)
      .eq(1)
      .should('exist')
      .and('be.visible')
      .and('have.text', `Permanent Address: ${userData.userPermanentAddress}`);
  });
});
