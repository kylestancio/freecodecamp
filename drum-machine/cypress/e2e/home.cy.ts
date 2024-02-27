describe('Home', () => {
  beforeEach(()=>{
    cy.visit('/');
  })

  // USER STORY 1
  it('has an element with id of drum-machine', () => {
    cy.get("#drum-machine")
      .should("exist");
  });

  // USER STORY 2
  it('has an element with id of display within #drum-machine', () => {
    cy.get("#drum-machine")
      .should("exist");
  });

  // USER STORY 3A
  it('has an 9 clickable elements with class of "drum-pad"', () => {
    cy.get(".drum-pad")
      .should("exist")
      .should("have.length", 9);
  });

  // USER STORY 3B
  it('elements with class of "drum-pad" should have one of the following key: "Q", "W", "E", "A", "S", "D", "Z", "X", or "C"', () => {
    cy.get(".drum-pad")
      .each((el, i) => {
        let text = "";
        if (i === 0) text = "Q";
        if (i === 1) text = "W";
        if (i === 2) text = "E";
        if (i === 3) text = "A";
        if (i === 4) text = "S";
        if (i === 5) text = "D";
        if (i === 6) text = "Z";
        if (i === 7) text = "X";
        if (i === 8) text = "C";
        cy.wrap(el).should("have.text", text);
      });
  });
})