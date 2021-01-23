/// <reference types="cypress" />

describe("Access home page", () => {
  beforeEach(() => {
    cy.visit("");
  });

  it("Validate that total price is equal to the price of two dresses added", () => {
    cy.get("a[title='Dresses']").last().click();
    cy.get("a[title='Add to cart'][ data-id-product='3']").click();
    cy.get("span[title='Continue shopping']").click();
    cy.get("a[title='Add to cart'][ data-id-product='4']").click();
    cy.get("a[title='Proceed to checkout']").click();
    var sum = 0;
    cy.get("td[class='cart_total'] span[class='price']")
      .each((el) => {
        var price = parseFloat(el.text().replace(/\s/g, "").replace("$", ""));
        sum += price;
      })
      .then(() => {
        sum = sum.toFixed(2);
        cy.get("#total_product").should("have.text", "$" + sum);
      });
  });
});
