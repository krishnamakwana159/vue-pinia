function getLatest(index = messages.items.length - 1) {
  return messages.items[index]
}

export const messages = {
  items: [
    { message: 'Simple test message 1', from: 'Testman' },
    { message: 'Simple test message 6', from: 'Testman' },
    { message: 'Simple test message 5', from: 'Testman' },
    { message: 'Simple test message 4', from: 'Testman' },
    { message: 'Simple test message 3', from: 'Testman' },
    { message: 'Simple test message 2', from: 'Testman' }
  ],
  getLatest // can also be a `getter or setter if supported`
}
