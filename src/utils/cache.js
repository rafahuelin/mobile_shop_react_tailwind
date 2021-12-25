export const EXPIRATION_TIME_MS = 60 * 60 * 1000 // 1h

export const isCacheExpired = (localStorageKey, timestampKey) => {
  try {
    const timestamp = JSON.parse(localStorage.getItem(timestampKey))
    const timeNow = new Date().getTime()
    const timeDifference = timeNow - timestamp
    if (isNaN(timeDifference)) throw new Error('time difference is NaN')
    const isExpired = timeDifference > EXPIRATION_TIME_MS
    return isExpired
  } catch (error) {
    console.error(`Error comparing cache expiration: ${error}`)
    localStorage.removeItem(localStorageKey)
    return true
  }
}

export const setCache = (data, localStorageKey, timestampKey) => {
  localStorage.setItem(localStorageKey, JSON.stringify(data))
  const timeNow = new Date().getTime()
  localStorage.setItem(timestampKey, timeNow)
}
