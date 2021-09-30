const TEMPLATE = document.createElement("template");
TEMPLATE.innerHTML = `
<link href="my-button.css" rel="stylesheet" type="text/css">  
<button>
  <slot />
</button>
`;

/**
 * A specific button.
 * It's doesn't make too much sense but is needed to show basic concepts of Web Components.
 *
 * @author Kai Klostermann <kai@odd.af>
 */
class MyButton extends HTMLElement {
  static get observedAttributes() {
    return ["disabled", "loading"];
  }

  /**
   * Returns the "actual button". Just made a quick getter to serve as an alias basically.
   */
  get shadowButton() {
    return this.shadowRoot.querySelector("button");
  }

  constructor() {
    super();
    this.initShadowDom();
    this.initAttributeHandling();
  }

  initShadowDom() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(TEMPLATE.content.cloneNode(true));
  }

  /**
   * Initializes a field to hold a convenient mapping of attributes and their corresponding behaviour of what should happen if they are changed.
   */
  initAttributeHandling() {
    this._attributeMap = new Map();
    this._attributeMap.set(
      "disabled",
      /**
       * Passes on the disabled state to the actual native button.
       *
       * @param {(string|null)} newValue Disabled is either present (some string) or not (null)
       * @returns void
       */
      (newValue) => (this.shadowButton.disabled = newValue !== null)
    );
    this._attributeMap.set(
      "loading",
      /**
       * Sets the attribute "aria-busy" to the actual native button based on the corresponding "loading" :host-attribute.
       *
       * @param {{string | null}} newValue Loading is either present (some string) or not (null)
       * @returns void
       */
      (newValue) =>
        this.shadowButton.setAttribute(
          "aria-busy",
          newValue === null ? "false" : "true"
        )
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Get the right function to execute on change from the map field.
    this._attributeMap.get(name)(newValue);
  }
}

customElements.define("my-button", MyButton);
