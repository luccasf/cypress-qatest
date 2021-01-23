/// <reference types="cypress" />

import { routs } from "../../support/routs";

let characters =
  "36345404374806433518340608568141997437197777332603757927875601990966675544297789054068946526646734311";

describe("Create Location", () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it("Create location successfully", () => {
    cy.request(
      routs.postCreateLocation({
        address: "Test address",
        city: "Test city",
        postcode: "1234",
        countryCode: "GBR",
        brandId: "e9f339dd-c89b-4290-8810-fad3d5fc9cf0",
        searchBy: {
          merchantIds: {
            visa: ["mID", "mID2"],
            mastercard: ["mID", "mID2"],
          },
        },
      })
    ).then((res) => {
      expect(res.status).to.be.equal(201);
    });
  });

  it("Create location without property address", () => {
    cy.request(
      routs.postCreateLocation({
        city: "Test city",
        postcode: "1234",
        countryCode: "GBR",
        brandId: "e9f339dd-c89b-4290-8810-fad3d5fc9cf0",
        searchBy: {
          merchantIds: {
            visa: ["mID", "mID2"],
            mastercard: ["mID", "mID2"],
          },
        },
      })
    ).then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error.metadata[0].message).to.be.equal(
        "should have required property 'address'"
      );
    });
  });

  it("Create location without property city", () => {
    cy.request(
      routs.postCreateLocation({
        address: "Test address",
        postcode: "1234",
        countryCode: "GBR",
        brandId: "e9f339dd-c89b-4290-8810-fad3d5fc9cf0",
        searchBy: {
          merchantIds: {
            visa: ["mID", "mID2"],
            mastercard: ["mID", "mID2"],
          },
        },
      })
    ).then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error.metadata[0].message).to.be.equal(
        "should have required property 'city'"
      );
    });
  });

  it("Create location without property postCode", () => {
    cy.request(
      routs.postCreateLocation({
        address: "Test address",
        city: "Test city",
        countryCode: "GBR",
        brandId: "e9f339dd-c89b-4290-8810-fad3d5fc9cf0",
        searchBy: {
          merchantIds: {
            visa: ["mID", "mID2"],
            mastercard: ["mID", "mID2"],
          },
        },
      })
    ).then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error.metadata[0].message).to.be.equal(
        "should have required property 'postcode'"
      );
    });
  });

  it("Create location without property country code", () => {
    cy.request(
      routs.postCreateLocation({
        address: "Test address",
        city: "Test city",
        postcode: "1234",
        brandId: "e9f339dd-c89b-4290-8810-fad3d5fc9cf0",
        searchBy: {
          merchantIds: {
            visa: ["mID", "mID2"],
            mastercard: ["mID", "mID2"],
          },
        },
      })
    ).then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error.metadata[0].message).to.be.equal(
        "should have required property 'countryCode'"
      );
    });
  });

  it("Create location without property brandId", () => {
    cy.request(
      routs.postCreateLocation({
        address: "Test address",
        city: "Test city",
        postcode: "1234",
        countryCode: "GBR",
        searchBy: {
          merchantIds: {
            visa: ["mID", "mID2"],
            mastercard: ["mID", "mID2"],
          },
        },
      })
    ).then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error.metadata[0].message).to.be.equal(
        "should have required property 'brandId'"
      );
    });
  });

  it("Create location with invalid brandId property (only uuid is allowed)", () => {
    cy.request(
      routs.postCreateLocation({
        address: "Test address",
        city: "Test city",
        postcode: "1234",
        countryCode: "GBR",
        brandId: "e9f339ddfad3d5fc9cf0",
        searchBy: {
          merchantIds: {
            visa: ["mID", "mID2"],
            mastercard: ["mID", "mID2"],
          },
        },
      })
    ).then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error.metadata[0].message).to.be.equal(
        'should match format "uuid"'
      );
    });
  });

  it("Create location with address property less than 2 characters", () => {
    cy.request(
      routs.postCreateLocation({
        address: "t",
        city: "Test city",
        postcode: "1234",
        countryCode: "GBR",
        brandId: "e9f339dd-c89b-4290-8810-fad3d5fc9cf0",
        searchBy: {
          merchantIds: {
            visa: ["mID", "mID2"],
            mastercard: ["mID", "mID2"],
          },
        },
      })
    ).then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error.metadata[0].message).to.be.equal(
        "should NOT be shorter than 2 characters"
      );
    });
  });

  it("Create location with city property less than 2 characters", () => {
    cy.request(
      routs.postCreateLocation({
        address: "Test",
        city: "T",
        postcode: "1234",
        countryCode: "GBR",
        brandId: "e9f339dd-c89b-4290-8810-fad3d5fc9cf0",
        searchBy: {
          merchantIds: {
            visa: ["mID", "mID2"],
            mastercard: ["mID", "mID2"],
          },
        },
      })
    ).then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error.metadata[0].message).to.be.equal(
        "should NOT be shorter than 2 characters"
      );
    });
  });

  it("Create location with postcode property less than 4 characters", () => {
    cy.request(
      routs.postCreateLocation({
        address: "Test",
        city: "Test city",
        postcode: "123",
        countryCode: "GBR",
        brandId: "e9f339dd-c89b-4290-8810-fad3d5fc9cf0",
        searchBy: {
          merchantIds: {
            visa: ["mID", "mID2"],
            mastercard: ["mID", "mID2"],
          },
        },
      })
    ).then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error.metadata[0].message).to.be.equal(
        "should NOT be shorter than 4 characters"
      );
    });
  });

  it("Create location with address property more than 100 characters", () => {
    cy.request(
      routs.postCreateLocation({
        address: characters,
        city: "Test",
        postcode: "1234",
        countryCode: "GBR",
        brandId: "e9f339dd-c89b-4290-8810-fad3d5fc9cf0",
        searchBy: {
          merchantIds: {
            visa: ["mID", "mID2"],
            mastercard: ["mID", "mID2"],
          },
        },
      })
    ).then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error.metadata[0].message).to.be.equal(
        "should NOT be longer than 100 characters"
      );
    });
  });

  it("Create location with city property more than 100 characters", () => {
    cy.request(
      routs.postCreateLocation({
        address: "Test",
        city: characters,
        postcode: "1234",
        countryCode: "GBR",
        brandId: "e9f339dd-c89b-4290-8810-fad3d5fc9cf0",
        searchBy: {
          merchantIds: {
            visa: ["mID", "mID2"],
            mastercard: ["mID", "mID2"],
          },
        },
      })
    ).then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error.metadata[0].message).to.be.equal(
        "should NOT be longer than 100 characters"
      );
    });
  });

  it("Create location with postcode property more than 20 characters", () => {
    cy.request(
      routs.postCreateLocation({
        address: "Test",
        city: "Test city",
        postcode: "1234567891011121314151617181912021",
        countryCode: "GBR",
        brandId: "e9f339dd-c89b-4290-8810-fad3d5fc9cf0",
        searchBy: {
          merchantIds: {
            visa: ["mID", "mID2"],
            mastercard: ["mID", "mID2"],
          },
        },
      })
    ).then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error.metadata[0].message).to.be.equal(
        "should NOT be longer than 20 characters"
      );
    });
  });

  it("Create location with invalid contry property (only letters is allowed)", () => {
    cy.request(
      routs.postCreateLocation({
        address: "Test",
        city: "Test city",
        postcode: "1234",
        countryCode: "1234",
        brandId: "e9f339dd-c89b-4290-8810-fad3d5fc9cf0",
        searchBy: {
          merchantIds: {
            visa: ["mID", "mID2"],
            mastercard: ["mID", "mID2"],
          },
        },
      })
    ).then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error.metadata[0].message).to.be.equal(
        "should be equal to one of the allowed values"
      );
    });
  });

  it("Create location with number in city property", () => {
    cy.request(
      routs.postCreateLocation({
        address: "Test",
        city: "Test 123",
        postcode: "1234",
        countryCode: "1234",
        brandId: "e9f339dd-c89b-4290-8810-fad3d5fc9cf0",
        searchBy: {
          merchantIds: {
            visa: ["mID", "mID2"],
            mastercard: ["mID", "mID2"],
          },
        },
      })
    ).then((res) => {
      expect(res.status).to.be.equal(400);
      expect(res.body.error.metadata[0].message).to.be.equal(
        'should pass "alpha" keyword validation'
      );
    });
  });
});
