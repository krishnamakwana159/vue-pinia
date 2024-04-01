describe('Product Form', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/admin/productForm')
  })

  it('Does not do much!', () => {

    const inputArr = [
      { name: 'productName', errorDiv: 'productName-error', value: '', errMsg: 'Value is required', errorDivExist: true, isDropDown: false }, 
      { name: 'productName', errorDiv: 'productName-error', value: 'a', errMsg: 'This field should be at least 5 characters long', errorDivExist: true, isDropDown: false },
      { name: 'productName', errorDiv: 'productName-error', value: 'sdfjshdgfhsdgfsgdf', errMsg: 'The maximum length allowed is 10', errorDivExist: true, isDropDown: false },
      { name: 'productName', errorDiv: 'productName-error', value: 'ABCDFE', errMsg: 'The maximum length allowed is 10', errorDivExist: false, isDropDown: false },
      { name: 'productPrice', errorDiv: 'productPrice-error', value: '', errMsg: 'Value is required', errorDivExist: true, isDropDown: false },
      { name: 'productPrice', errorDiv: 'productPrice-error', value: -1, errMsg: 'The minimum value allowed is 0', errorDivExist: true, isDropDown: false },
      { name: 'productPrice', errorDiv: 'productPrice-error', value: 1, errMsg: '', errorDivExist: false, isDropDown: false },
      { name: 'productCategory', errorDiv: 'productCategory-error', value: '', errMsg: 'Value is required', errorDivExist: true, isDropDown: true },
      { name: 'productCategory', errorDiv: 'productCategory-error', value: 'Electronic', errMsg: '', errorDivExist: false, isDropDown: true },
    ]

    inputArr.forEach(input => {
      cy.get(`#${input.name}`).focus().blur()

      if (input.value) {
        cy.get(`#${input.name}`).type('{selectall}').type(input.value.toString())
        
        if(input.isDropDown) {
          cy.get(`#${input.name}`).select(input.value)
        }
      }


      if (input.errorDivExist) {
        cy.get(`#${input.errorDiv}`).contains(input.errMsg)
      }
    })

  })


  it('Add Product is binded in Table or not', () => {

    const productObj = {
      name: 'ProductAB',
      price: 5000,
      category: 'Electronic'
    }

    cy.get(`#productName`).type(productObj.name)

    cy.get('#productPrice').type(productObj.price.toString())
    
    cy.get('#productCategory').select(productObj.category)

    cy.get('input[type="submit"]').click();
    
    cy.get('table tr:last').contains(productObj.name)

    cy.get('table tr:last').contains(productObj.price)

    cy.get('table tr:last').contains(productObj.category)
  })


  it('Edit Product Test Case' , () => {

    const productObj = {
      name: 'ProductAB',
      price: 5000,
      category: 'Electronic'
    }

    const newProductObj = {
      name: 'Product C',
      price: 10000,
      category: 'Furniture'
    }

    // Fill the product Detail in product form
    cy.get(`#productName`).type(productObj.name)

    cy.get('#productPrice').type(productObj.price.toString())
    
    cy.get('#productCategory').select(productObj.category)

    cy.get('input[type="submit"]').click();
    
    // Check the Product is binded in table or not
    cy.get('table tr:last').contains(productObj.name)

    cy.get('table tr:last').contains(productObj.price)

    cy.get('table tr:last').contains(productObj.category)

    cy.get('table tbody tr:last-child button:first-child').first().click()

    // Check Edit Product is binded in Form or not
    cy.get('#productName').should('have.value',productObj.name)
    
    cy.get('#productPrice').should('have.value', productObj.price.toString())

    cy.get('#productCategory').should('have.value', productObj.category)

    // Add new Value to Current Form
    cy.get(`#productName`).clear().type(newProductObj.name)

    cy.get('#productPrice').clear().type(newProductObj.price.toString())
    
    cy.get('#productCategory').select(newProductObj.category)

    cy.get('input[type="submit"]').click();
    
    // Check if the new Value is binded to Table or not
    cy.get('table tr:last').contains(newProductObj.name)

    cy.get('table tr:last').contains(newProductObj.price)

    cy.get('table tr:last').contains(newProductObj.category)

    // Check if the old value is removed from table or not
    cy.get('table tr:last').should('not.contain',productObj.name)

    cy.get('table tr:last').should('not.contain',productObj.price)

    cy.get('table tr:last').should('not.contain',productObj.category)
  })

  it('Delete Test Case', () => {

    const productObj = {
      name: 'ProductAB',
      price: 5000,
      category: 'Furniture'
    }

    // Fill the product Detail in product form
    cy.get(`#productName`).type(productObj.name)

    cy.get('#productPrice').type(productObj.price.toString())
    
    cy.get('#productCategory').select(productObj.category)

    cy.get('input[type="submit"]').click();

    cy.get('table tbody tr:last-child button:first-child').last().click()

    // Check if the Value is been removed from the Product List
    cy.get('table tr:last').should('not.contain',productObj.name)

    cy.get('table tr:last').should('not.contain',productObj.price)

    cy.get('table tr:last').should('not.contain',productObj.category)
  })
})