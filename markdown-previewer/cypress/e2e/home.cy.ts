import { marked } from "marked";

describe('Homepage', () => {
  beforeEach(()=>{
    cy.visit('/')
  });

  it('Has a textarea with id "editor"', () => {
    cy.get('textarea#editor')
  })

  it('Has an element with id "preview"', () => {
    cy.get('#preview')
  })

  it('Updates the preview everytime the editor changes', () => {
    const testText = "Hello world"
    cy.get("textarea#editor").clear()
    cy.get("textarea#editor").type(testText)
    cy.get("#preview").should("contain.html", "p").should("contain.text", testText)
  })

  it('Displays GitHub flavored markdown from #editor in #preview as HTML', () => {
    cy.get("textarea#editor").clear()

    cy.get("textarea#editor").type("# Heading 1\n")
    cy.get("#preview").should("contain.html", "h1").should("contain.text", "Heading 1\n")
    cy.get("textarea#editor").clear()

    cy.get("textarea#editor").type("## Heading 2\n")
    cy.get("#preview").should("contain.html", "h2").should("contain.text", "Heading 2\n")
    cy.get("textarea#editor").clear()

    cy.get("textarea#editor").type("### Heading 3\n")
    cy.get("#preview").should("contain.html", "h3").should("contain.text", "Heading 3\n")
    cy.get("textarea#editor").clear()

    cy.get("textarea#editor").type("#### Heading 4\n")
    cy.get("#preview").should("contain.html", "h4").should("contain.text", "Heading 4\n")
    cy.get("textarea#editor").clear()

    cy.get("textarea#editor").type("##### Heading 5\n")
    cy.get("#preview").should("contain.html", "h5").should("contain.text", "Heading 5\n")
    cy.get("textarea#editor").clear()

    cy.get("textarea#editor").type("###### Heading 6\n")
    cy.get("#preview").should("contain.html", "h6").should("contain.text", "Heading 6\n")
    cy.get("textarea#editor").clear()

    const link = "http://google.com/"

    cy.get("textarea#editor").type(`[Link](${link})`)
    cy.get("#preview").should("contain.html", "p")
    cy.get("#preview p").should("contain.html", "a")
    cy.get("#preview p a").should("contain.text", "Link")
    cy.get("#preview p a").should("have.attr", "href", link)
  })

  it("Previews the default input from #editor in #preview", () => {

    const test = cy.get("textarea#editor")
      .invoke("text")
      .then((input:any) => {
        cy.log(input)
        return input
      });
    // cy.log(`TEST: ${test as unknown as string}`);
    // const test = marked.parse(input as unknown as string);
    // cy.get("#preview").should("have.html", test)
  })
})