import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import ListItem from '../Components/ListItem'
import Search from '../Components/Search'
import { isCacheExpired, setCache } from '../utils/cache'
import { PRODUCTS_URL } from '../api/endpoints'


const LOCAL_STORAGE_KEY = 'mobiles'
const TIMESTAMP_KEY = 'mobilesTimestamp'

const ListPage = () => {
  const [mobiles, setMobiles] = useState([])
  const [filteredMobiles, setFilteredMobiles] = useState([])
  
  const fetchFromCache = () => {
    const jsonData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    setMobiles(jsonData)
    setFilteredMobiles(jsonData)
  }
  
  const fetchFromAPI = async() => {
    const data = await fetch(PRODUCTS_URL)
    const jsonData = await data.json()
    setMobiles(jsonData)
    setFilteredMobiles(jsonData)
    setCache(jsonData, LOCAL_STORAGE_KEY, TIMESTAMP_KEY)
  }

  useEffect(() => {
    isCacheExpired(LOCAL_STORAGE_KEY, TIMESTAMP_KEY) ? fetchFromAPI() : fetchFromCache()
  }, [])

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
      <div className="px-0 sm:px-5 md:px-10 items-stretch">
        <Header />
        <div className='min-w-min'>
          <Search handleSearch={handleSearch} />
          <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 grow">
            { filteredMobiles.map(mobile => <ListItem key={mobile.id} mobile={mobile} />) }
          </div>
        </div>
        
      </div>
    </div>
  )
}

ListPage.propTypes = {
  data: PropTypes.array
}

export default ListPage
