export const EXPIRATION_TIME_MS = 60 * 60 * 1000 // 1h
export const LOCAL_STORAGE_CART_KEY = 'cart'
export const LOCAL_STORAGE_MOBILE_KEY = 'mobiles'
export const TIMESTAMP_CART_KEY = 'cartTimestamp'
export const TIMESTAMP_MOBILE_KEY = 'mobilesTimestamp'


export const initCartStore = () => {
  (!isCartStorageSet || isNaN(parseInt(localStorage.getItem(LOCAL_STORAGE_CART_KEY)))) && resetCartStore()
  isCacheExpired(LOCAL_STORAGE_CART_KEY, TIMESTAMP_CART_KEY) && resetCartStore()
}

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

export const isCartStorageSet = () => localStorage.getItem(LOCAL_STORAGE_CART_KEY) !== null
  
export const resetCartStore = () => {
  setCache(0, LOCAL_STORAGE_CART_KEY, TIMESTAMP_CART_KEY)
}

export const setCache = (data, localStorageKey, timestampKey) => {
  localStorage.setItem(localStorageKey, JSON.stringify(data))
  const timeNow = new Date().getTime()
  localStorage.setItem(timestampKey, timeNow)
}