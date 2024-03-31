import { assertType, describe, expect, expectTypeOf, it } from 'vitest'
import { sum } from './sum'

describe('test Sum Function', () => {
  it('Sum of 1 + 2 = 3', () => {
    expect(sum(2, 3)).toBe(5)
  })
})

describe('Snapshot', () => {
  it('Snapshot works', () => {
    const test = sum(1, 2)
    expect(test).toMatchSnapshot()
  })
})

describe('Test the data Types', () => {
  it('Test Data Types', () => {
    expectTypeOf(sum).toBeFunction()

    expectTypeOf(sum).parameter(0).toMatchTypeOf<number>() // Not Working as expected
  })
})
