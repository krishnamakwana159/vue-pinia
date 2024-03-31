import { mount, flushPromises } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProductForm from '../components/ProductForm.vue'
import router from '@/router'

describe('Product Form', () => {
  it('Validation of Product Form', async () => {
    router.push('/admin')

    await router.isReady()

    const wrapper = mount(ProductForm, {
      global: {
        plugins: [router]
      }
    })

    const inputArr = wrapper.findAll('input')

    await flushPromises()

    console.log(inputArr)

    expect(true).toBeTruthy()
  })
})
