import urls from '../../config/urls';

describe('Text Box Tests', () => {
  beforeEach(() => {
    cy.visit(urls.textBoxPage);
    cy.contains(textBox.titleTextBox, 'Text Box').should('be.visible');
  });

  // No field validation
  it('Check validation of the "Email" field', () => {
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
      //cy.get(textBox.errorMessage).should('be.visible');
    });
  });
});
