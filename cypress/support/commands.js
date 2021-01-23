// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import "cypress-localstorage-commands";

Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "https://cognito-idp.eu-west-1.amazonaws.com/",
    body: {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: "2l84ru0poltttsr6o28661dbt8",
      AuthParameters: {
        USERNAME: "luccassk8@hotmail.com",
        PASSWORD: "Luccas123!",
      },
    },
    headers: {
      "x-amz-target": "AWSCognitoIdentityProviderService.InitiateAuth",
      "content-type": "application/x-amz-json-1.1",
    },
  }).then((res) => {
    expect(res.status).to.be.equal(200);
    cy.setLocalStorage("token", res.body.AuthenticationResult.IdToken);
  });
  cy.saveLocalStorage();
});
