// describe('Product List', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:5173/admin/productList')
//   })

//   // it('Product List empty test case', () => {
//   //   cy.get('table tbody tr:last-child button:first-child').last().click()

//   //   cy.get('body').should('contain.text', 'Add Product to see the Product List')
//   // })

//   it('Product List should not be empty', () => {
//     cy.get('table tbody tr:last-child button:first-child').last().click()

//     cy.get('body').should('not.contain.text', 'Add Product to see the Product List')
//   })

//   it('Product added in cart', () => {
//     //  cy.get('[data-test="btnAddToCart"]').click();
//     cy.get('[data-test="btnAddToCart"]').should('contain.value', 'Add to Cart').click()

//     cy.get('[data-test="navCart"]').click()

//     //not rendered in the DOM as used v-if-else
//     //cy.get('.empty-cart').should('not.be.visible')

//     cy.get('h2').should('contain', 'Your Cart')

//     cy.get('.cart-container').should('be.visible')
//     cy.get('.cart-container')
//       .within(() => {
//         cy.get('.cart-items').should('exist')
//         cy.get('.cart-item-details').should('exist')

//         cy.get('.quantity-value').should('not.contain.text', 0)
//         cy.get('[data-test="btnIncrementQuntity"]').should('exist')
//         cy.get('[data-test="btnRemove"]').should('exist')
//         cy.get('[data-test="btnDecrementQuntity"]').should('exist')
//         cy.get('.cart-total strong').should('contain', 499)
//       })
//       .should('be.visible')

//     //  cy.get('[data-test="cart-items"]').should('be.visible');

//     //  const expectedLength = 3;
//     //  cy.get('li').should('have.length', expectedLength);
//     //  cy.get('li:first-child').should('be.visible');
//     //  cy.get('li:first-child p').should('contain.text', 'Product A');
//   })
// })
