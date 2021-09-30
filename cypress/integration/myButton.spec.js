describe("Component myButton", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5000");
  });
  it("successfully loads", () => {
    cy.get("my-button");
  });
  it("renders the slot", () => {
    cy.get("my-button").contains("Foobar");
  });
  it("reflects disabled state", () => {
    cy.get("my-button").shadow().find("button").should("be.disabled");
  });
  it("updates disabled state", () => {
    cy.get("my-button").invoke("attr", "disabled", null);
    cy.get("my-button").shadow().find("button").should("be.enabled");
  });
  it("reflects loading state", () => {
    cy.get("my-button")
      .shadow()
      .find("button")
      .invoke("attr", "aria-busy")
      .should("eq", "true");
    cy.get("my-button").click();
    cy.once("fail", (error) => {
      expect(error.message).to.include(
        "`cy.click()` failed because this element"
      );
      expect(error.message).to.include("CSS `pointer-events: none`");
    });
  });
  it("updates loading state", () => {
    cy.get("my-button").invoke("attr", "loading", null);
    cy.get("my-button")
      .shadow()
      .find("button")
      .invoke("attr", "aria-busy")
      .should("eq", "false");
    cy.get("my-button").click();
  });
});
