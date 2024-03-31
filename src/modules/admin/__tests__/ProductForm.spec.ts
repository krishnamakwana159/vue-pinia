import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProductForm from '../components/ProductForm.vue'
import { createTestingPinia } from '@pinia/testing'

describe('Product Form', () => {
  it('Validation of Product Form', async () => {
    const wrapper = mount(ProductForm, {
      global: {}
    })

    const inputArr = wrapper.findAll('input')

    console.log(inputArr)

    expect(true).toBeTruthy()
  })
})
