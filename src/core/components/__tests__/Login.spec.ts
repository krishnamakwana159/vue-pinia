import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Login from '../../components/Login.vue'

describe('test', () => {
  it('renders correctly', () => {
    const wrapper = mount(Login)
    expect(wrapper.exists()).toBe(true)
  })
})
