/// <reference types="cypress" />
import { v4 as uuidv4 } from "uuid";

describe("Create Brand", () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it("Create brand successfully", () => {
    let value = uuidv4();
    cy.request({
      method: "POST",
      url: "https://api.fidel.uk/v1/brands",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "fidel-key": "dashboard_e33fe6a3-293f-4e64-a35b-9fe942c0824b",
        "content-type": "application/json",
        "fidel-live": "false",
        origin: "https://dashboard.fidel.uk",
      },
      body: {
        name: value,
      },
    }).then((res) => {
      expect(res.status).to.be.equal(201);
    });
  });

  it("Create brand with duplicate name", () => {
    cy.request({
      method: "POST",
      url: "https://api.fidel.uk/v1/brands",
      failOnStatusCode: false,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "fidel-key": "dashboard_e33fe6a3-293f-4e64-a35b-9fe942c0824b",
        "content-type": "application/json",
        "fidel-live": "false",
        origin: "https://dashboard.fidel.uk",
      },
      body: {
        name: "test",
      },
    }).then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error.message).to.be.equal("Item already exists");
    });
  });
});
