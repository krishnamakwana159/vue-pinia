import { RouterLinkStub, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import NavBar from '../NavBar.vue'

const navBarList: string[] = ['Product List', 'Product Form']

describe('NavBar', () => {
  it('HTML Render For Navbar', () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    navBarList.forEach((element) => {
      expect(wrapper.text()).toContain<string>(element)
    })

    wrapper.findAllComponents(RouterLinkStub).forEach((elem) => {
      expect(elem.props().to).toBeTruthy()
    })
  })

  it('to Property is added to RouterLink Tag', () => {
    const wrapper = mount(NavBar, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    wrapper.findAllComponents(RouterLinkStub).forEach((elem) => {
      expect(elem.props().to).toBeTruthy()
    })
  })
})
