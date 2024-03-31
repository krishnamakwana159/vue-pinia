const businessHours: number[] = [9, 17]

export function purchase(): { message: string } {
  const currentHour = new Date().getHours()
  const [open, close] = businessHours

  if (currentHour > open && currentHour < close) return { message: 'Success' }

  return { message: 'Error' }
}
