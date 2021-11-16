import '../support/commands'
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

describe('Test', function () {   
       it('Testcase demo', function (){
          cy.visit("https://www.skyscanner.com/");
          cy.get("input#fsc-destination-search").type("SGN");
          cy.get("span > strong").contains("SGN").click();
          cy.get("div > button[type='submit']").click();
          cy.get("a[class^=FlightsTicket_link]").should('have.length.greaterThan',1);
          cy.get("a[class^=FlightsTicket_link]").first().find('button').click();
          cy.get("h4[class^=BpkText_bpk]").parents("div[class^= Itinerary_leg]").find("svg").first().click();
          cy.get("div[class^= LegSegmentDetails_segmentDetails]").find("span").contains('SGN');
          cy.get("a[class^='CrossSellAdvertV2'][aria-label='hotels']").invoke('removeAttr', 'target').click();
//           cy.get("button[data-test-id='filterExpandButton']").click();
          cy.get("input#PR_BK_2").click();
        //  Temporary comment because of different between real browser and automated browser
        //   cy.get("buttn[data-test-id='show-result-button']").click();
          cy.get("button[kind=PR_BK_2]").then(($btn) => {
              const price = $btn.text().split("-");
              const priceStart = parseInt(price[0].replace(/\D/g,''));
              const priceEnd = parseInt(price[1].replace(/\D/g,''));
              cy.get("div[class^=HotelCard_HotelCard__priceVariant]").each(($div) => {
                    const text = parseInt($div.text().replace(/\D/g,''));
                    expect(text).to.greaterThan(priceStart).lessThan(priceEnd);
              })
          })
       });
       
    });
