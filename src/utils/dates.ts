import {
  format,
  formatISO,
  isFriday,
  isSaturday,
  isThursday,
  isWednesday,
  nextWednesday,
  previousWednesday
} from 'date-fns'

export function getDayOfWeek(date: Date) {
  return format(date, 'eeee')
}

export function getISODate(date: Date) {
  return formatISO(date, { representation: 'date' })
}

function isAfterWednesday(date: Date) {
  return isThursday(date) || isFriday(date) || isSaturday(date)
}

export function getHighlightedDateOfWeek() {
  const today = new Date()

  if (isWednesday(today)) {
    return today
  } else if (isAfterWednesday(today)) {
    return previousWednesday(today)
  }

  return nextWednesday(today)
}
