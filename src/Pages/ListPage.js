import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import ListItem from '../Components/ListItem'
import Search from '../Components/Search'


const EXPIRATION_TIME_MS = 60 * 60 * 1000 // 1h
const PRODUCTS_URL = 'https://front-test-api.herokuapp.com/api/product'

const isCacheExpired = () => {
  try {
    const timestamp = JSON.parse(localStorage.getItem('mobilesTimestamp'))
    const timeNow = new Date().getTime()
    const timeDifference = timeNow - timestamp
    if (isNaN(timeDifference)) throw new Error('time difference is NaN')
    return timeNow - timestamp > EXPIRATION_TIME_MS
  } catch (error) {
    console.error(`Error comparing cache expiration: ${error}`)
    localStorage.removeItem('mobiles')
    return true
  }
}

const ListPage = () => {
  const [mobiles, setMobiles] = useState([])
  const [filteredMobiles, setFilteredMobiles] = useState([])

  const setCache = (data) => {
    localStorage.setItem('mobiles', JSON.stringify(data))
    const timeNow = new Date().getTime()
    localStorage.setItem('mobilesTimestamp', timeNow)
  }
  
  const fetchFromCache = () => {
    const jsonData = JSON.parse(localStorage.getItem('mobiles'))
    setMobiles(jsonData)
    setFilteredMobiles(jsonData)
    setCache(jsonData)
  }
  
  const fetchFromAPI = async() => {
    const data = await fetch(PRODUCTS_URL)
    const jsonData = await data.json()
    setMobiles(jsonData)
    setFilteredMobiles(jsonData)
    setCache(jsonData)
  }

  useEffect(() => {
    isCacheExpired() ? fetchFromAPI() : fetchFromCache()
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
