import { afterEach, beforeEach, describe, vi, it, expect, expectTypeOf } from 'vitest'
import { messages } from './message'

describe('Reading Message', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('does the message function spy', () => {
    const spy = vi.spyOn(messages, 'getLatest')

    expect(spy.getMockName()).toBe('getLatest')

    expect(messages.getLatest()).toEqual(messages.items[messages.items.length - 1])

    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('does the message function with mock', () => {
    const mock = vi.fn().mockImplementation(messages.getLatest)

    expect(mock()).toEqual(messages.items[messages.items.length - 1])

    expect(mock).toBeCalledTimes(1)
  })
})

describe('Testing Data Types', () => {
  it('Test Data Types', () => {
    expectTypeOf(messages).toBeObject()

    expectTypeOf(messages.getLatest).toBeFunction()

    expectTypeOf(messages.items).toBeArray()
  })
})
