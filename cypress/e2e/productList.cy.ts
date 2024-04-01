describe('Product List', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/admin/productList')
  })

  it('Product List empty test case', () => {
    cy.get('table tbody tr:last-child button:first-child').last().click()

    cy.get('body').should('contain.text', 'Add Product to see the Product List')
  })
})
