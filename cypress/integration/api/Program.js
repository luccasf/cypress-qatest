/// <reference types="cypress" />

describe("Create Program", () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it("Create program successfully", () => {
    cy.request({
      method: "POST",
      url: "https://api.fidel.uk/v1/programs",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "fidel-key": "dashboard_e33fe6a3-293f-4e64-a35b-9fe942c0824b",
        "content-type": "application/json",
        "fidel-live": "false",
        origin: "https://dashboard.fidel.uk",
      },
      body: {
        name: "Smile",
        icon: ":slightly_smiling_face:",
        iconBackground: "#fedcd7",
      },
    }).then((res) => {
      expect(res.status).to.be.equal(201);
    });
  });

  it("Create program without required property name", () => {
    cy.request({
      method: "POST",
      url: "https://api.fidel.uk/v1/programs",
      failOnStatusCode: false,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "fidel-key": "dashboard_e33fe6a3-293f-4e64-a35b-9fe942c0824b",
        "content-type": "application/json",
        "fidel-live": "false",
        origin: "https://dashboard.fidel.uk",
      },
      body: {
        icon: ":slightly_smiling_face:",
        iconBackground: "#fedcd7",
      },
    }).then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error.metadata[0].message).to.be.equal(
        "should have required property 'name'"
      );
    });
  });
});
