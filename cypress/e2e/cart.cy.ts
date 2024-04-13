describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/admin/cart')
  })

  it('passes', () => {
    cy.get('h2').contains(/Your Cart/i)
    cy.url().should('match', /\/cart$/)
    cy.get('.empty-cart').should('be.visible')
    cy.get('.cart-total').should('not.exist')
  })

  it('Should add/remove an item to the cart with total update', () => {
    cy.get('[data-test="navProductList"]')
      .should('be.visible')
      .should('contain.text', 'Product List')
      .click()

    cy.get('[data-test="btnAddToCart"]')
      .should('be.visible')
      .should('contain.value', 'Add to Cart')
      .click()

    cy.get('[data-test="navCart"]').should('be.visible').click()

    //not rendered in the DOM as used v-if-else
    //cy.get('.empty-cart').should('not.be.visible')

    cy.get('h2').should('be.visible').should('contain', 'Your Cart')
    // cy.get('.cart-container').should('be.visible')

    cy.get('.cart-container')
      .within(() => {
        cy.get('.cart-items').should('exist')
        cy.get('.cart-item-details').should('exist')

        cy.get('.quantity-value').should('not.contain.text', 0)
        cy.get('[data-test="btnIncrementQuntity"]').should('exist')
        cy.get('[data-test="btnRemove"]').should('exist')
        cy.get('[data-test="btnDecrementQuntity"]').should('exist')
        cy.get('.cart-total strong').should('contain', 499)
      })
      .should('be.visible')
      .and('contain', 'Your Cart')

    // Update the quntity - Increment
    let updatedQnty = 0
    cy.get('.product-price')
      .invoke('text')
      .then((valueText) => {
        const value = parseFloat(valueText)

        // Manipulate the value (multiply by 2)
        const manipulatedValue = value * 2
        updatedQnty = manipulatedValue

        cy.log('Original value:', value)
        cy.log('Manipulated value:', manipulatedValue)
        cy.get('[data-test="btnIncrementQuntity"]').click()
        cy.get('.quantity-value').should('contain.text', 2)
        cy.get('.product-subtotal').should('contain.text', updatedQnty)
        cy.get('.cart-total').should('contain.text', updatedQnty)
      })

    // Update the quntity - Decrement
    cy.get('.product-price')
      .invoke('text')
      .then((valueText) => {
        const price = parseFloat(valueText)
        const updatedSubtotal = price

        cy.log('Product Price:', price)
        cy.log('Updated Subtotal:', updatedSubtotal)

        cy.get('[data-test="btnDecrementQuntity"]').click()
        cy.get('.quantity-value').should('contain.text', '1') // Assuming quantity decremented to 1
        cy.get('.product-subtotal').should('contain.text', updatedSubtotal.toFixed(2))
        cy.get('.cart-total').should('contain.text', updatedSubtotal.toFixed(2))
      })

      cy.get('[data-test="btnRemove"]').should('be.visible').click() // Click remove button for the first item
    cy.get('.empty-cart').should('be.visible');
    cy.get('.cart-items').should('have.length', 0).should('not.exist')
    cy.get('.cart-total').should('not.exist') // Total should disappear

    //#region comments
    // cy.get('a').should('contain.', 'Add to Cart').click()

    // const expectedHref = '/productList'

    // cy.get('a').invoke('attr', 'href').then(href => {
    //   // Assert that the href attribute value matches the expected value
    //   expect(href).contain(expectedHref)
    // })

    // cy.get('a[href*="productList"]').click()
    //  cy.get('[data-test="btnAddToCart"]').click();
    //#endregion
  })

  // it('should remove an item from the cart and update the total', () => {

  //   cy.get('[data-test="btnRemove"]').should('be.visible').click() // Click remove button for the first item
  //   cy.get('.empty-cart').should('be.visible');
  //   cy.get('.cart-items').should('have.length', 0)
  //   cy.get('.cart-total').should('not.exist') 
  //   // cy.get('.empty-cart').should('be.visible') 
  // })

})
