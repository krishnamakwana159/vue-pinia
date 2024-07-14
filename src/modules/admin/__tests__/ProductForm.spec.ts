import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import ProductForm from '../components/ProductForm.vue'
import router from '@/router'
import { createTestingPinia } from '@pinia/testing';

describe('Product Form', () => {
  it('Validation of Product Form', async () => {
    router.push('/admin')

    await router.isReady()

    const wrapper = mount(ProductForm, {
      global: {
        plugins: [
          createTestingPinia({
          createSpy: vi.fn,
          }), 
          router
        ]
      }
    })

    
    const inputArr = [
      {name: 'productName', errorDiv: 'productName-error', value: '', errMsg: 'Value is required', errorDivExist: true},
      {name: 'productName', errorDiv: 'productName-error', value: 'a', errMsg: 'This field should be at least 5 characters long', errorDivExist: true},
      {name: 'productName', errorDiv: 'productName-error', value: 'sdfjshdgfhsdgfsgdf', errMsg: 'The maximum length allowed is 10', errorDivExist: true},
      {name: 'productName', errorDiv: 'productName-error', value: 'ABCDFE', errMsg: 'The maximum length allowed is 10', errorDivExist: false},
      {name: 'productPrice', errorDiv: 'productPrice-error', value: '', errMsg: 'Value is required', errorDivExist: true},
      {name: 'productPrice', errorDiv: 'productPrice-error', value: '-1', errMsg: 'The minimum value allowed is 0', errorDivExist: true},
      {name: 'productPrice', errorDiv: 'productPrice-error', value: '1', errMsg: '', errorDivExist: false},
      {name: 'productCategory', errorDiv: 'productCategory-error', value: '', errMsg: 'Value is required', errorDivExist: true},
      {name: 'productCategory', errorDiv: 'productCategory-error', value: 'Electronic', errMsg: '', errorDivExist: false},
    ]
    
    for(let i = 0; i < inputArr.length; i++ ) {

      const inputElem = inputArr[i];

      const currInputElem = await wrapper.find(`#${inputElem.name}`)

      await currInputElem.setValue(inputElem.value); // SET Input value

      await currInputElem.trigger('blur');

      const errorDivElem = await wrapper.find(`#${inputElem.errorDiv}`) // Find the error div

      if(inputElem.errorDivExist) {

        await expect(errorDivElem.text()).toContain(inputElem.errMsg) // Checking for particular error msg
      }else {
        await expect(errorDivElem.exists()).toBeFalsy();
      }
    }

    expect(true).toBeTruthy()
  })
})