import { afterEach, beforeEach, describe, vi, it, expect } from 'vitest'
import { purchase } from './purchase'

describe('Purchase Function Test Case', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Allow Business hour test Case', () => {
    const date = new Date(2024, 1, 1, 13)
    vi.setSystemTime(date)
    expect(purchase()).toEqual({ message: 'Success' })
  })

  it('Not Allow Business hour test Case', () => {
    const date = new Date(2024, 1, 1, 20)
    vi.setSystemTime(date)
    expect(purchase()).toEqual({ message: 'Error' })
  })
})
