import { test, expect, type Page } from '@playwright/test'

const baseServerUrl: string = 'http://localhost:5173/'
const relativeAdminUrl: string = 'admin/'
const adminUrl: string = baseServerUrl + relativeAdminUrl
const productFormUrl: string = adminUrl + 'productForm'
const productListUrl: string = adminUrl + 'productList'
const productCartUrl: string = adminUrl + 'cart'

enum inputType {
    text,
    dropDown
}  

const validationTestCaseArr: any[] = [
    {label: 'Name', inputValue: '',errMsg: 'Value is required', disabled: true, inputType: inputType.text},
    {label: 'Name', inputValue: 'ts',errMsg: 'This field should be at least 5 characters long', disabled: true, inputType: inputType.text},
    {label: 'Name', inputValue: 'ABCDEFGHIJKL',errMsg: 'The maximum length allowed is 10', disabled: true, inputType: inputType.text},
    {label: 'Price', inputValue: '',errMsg: 'Value is required', disabled: true, inputType: inputType.text},
    {label: 'Price', inputValue: '-34',errMsg: 'The minimum value allowed is 0', disabled: true, inputType: inputType.text},
    {label: 'Category', inputValue: 'Select Category',errMsg: 'Value is required', disabled: true, inputType: inputType.dropDown},
]

test.beforeEach(async ({page}) => {
  await page.goto(productFormUrl)
})

test.describe('Form', async() => {

    test('Validation Test Case', async({page}) => {

        for(let i = 0; i < validationTestCaseArr.length; i++) {
            const x = validationTestCaseArr[i];

            await expect(page.getByLabel(x.label)).toBeVisible()
    
            switch(x.inputType) {
                case inputType.text:
                    await page.getByLabel(x.label).fill(x.inputValue)
                    break;
                case inputType.dropDown:
                    await page.getByLabel(x.label).selectOption(x.inputValue)
                    await page.getByLabel(x.label).focus()
                    break;
                default:
                    throw Error('Add Input Type in enum');
            }
            
            await page.getByLabel(x.label).blur()
    
            await expect(page.getByText(x.errMsg)).toBeVisible()
    
            await expect(page.getByRole('button', {name: 'Add Product', disabled: x.disable})).toBeVisible()
        }

    })
})