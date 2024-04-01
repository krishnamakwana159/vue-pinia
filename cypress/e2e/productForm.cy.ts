describe('My First Test', () => {

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
})