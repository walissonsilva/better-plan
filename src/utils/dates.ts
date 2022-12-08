import { format, formatISO } from 'date-fns'

export function getDayOfWeek(date: Date) {
  return format(date, 'eeee')
}

export function getISODate(date: Date) {
  return formatISO(date, { representation: 'date' })
}
