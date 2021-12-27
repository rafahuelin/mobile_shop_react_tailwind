import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import ListItem from '../Components/ListItem'
import Search from '../Components/Search'
import {
  initCartStore,
  isCacheExpired,
  setCache,
  LOCAL_STORAGE_CART_KEY,
  LOCAL_STORAGE_MOBILE_KEY,
  TIMESTAMP_MOBILE_KEY,
} from '../utils/cache'
import { BASE_URL, PRODUCTS_ENDPOINT } from '../api/endpoints'


const ListPage = () => {
  const [cartCount, setCartCount] = useState('0')
  const [mobiles, setMobiles] = useState([])
  const [filteredMobiles, setFilteredMobiles] = useState([])

  useEffect(() => {
    initCartStore()
    isCacheExpired(LOCAL_STORAGE_MOBILE_KEY, TIMESTAMP_MOBILE_KEY) ? fetchFromAPI() : fetchFromCache()
    const cartCachedValue = localStorage.getItem(LOCAL_STORAGE_CART_KEY)
    setCartCount(cartCachedValue)
  }, [])
  
  const fetchFromCache = () => {
    const jsonData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_MOBILE_KEY))
    setMobiles(jsonData)
    setFilteredMobiles(jsonData)
  }
  
  const fetchFromAPI = async() => {
    const data = await fetch(`${BASE_URL}${PRODUCTS_ENDPOINT}`)
    const jsonData = await data.json()
    setMobiles(jsonData)
    setFilteredMobiles(jsonData)
    setCache(jsonData, LOCAL_STORAGE_MOBILE_KEY, TIMESTAMP_MOBILE_KEY)
  }

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase()
    searchValue !== '' && setFilteredMobiles(mobiles.filter(mobile => {
      const brand = mobile.brand.toLowerCase()
      const model = mobile.model.toLowerCase()
      const isMatch = brand.includes(searchValue) || model.includes(searchValue)
      return isMatch
    }))

    searchValue === '' && setFilteredMobiles(mobiles)
  }

  return (
    <div className='relative'>
      <div className="px-0 sm:px-5 lg:px-10 items-stretch">
        <Header cartCount={cartCount} />
        <div className='min-w-min'>
          <Search handleSearch={handleSearch} />
          <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 grow">
            { filteredMobiles.map(mobile => <ListItem key={mobile.id} mobile={mobile} />) }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListPage
