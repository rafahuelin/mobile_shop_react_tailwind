import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Components/Header'
import { isCacheExpired, setCache } from '../utils/cache'
import { BASE_URL, CART_ENDPOINT, PRODUCTS_ENDPOINT } from '../api/endpoints'


const LOCAL_STORAGE_CART_KEY = 'cart'
const TIMESTAMP_CART_KEY = 'cartTimestamp'

const DetailPage = () => {
  const emptyMobile = {
    options: {
      storages: ['-'],
      colors: ['-']
    }
  }
  const emptySelection = {code: '-', name: '-'}
  
  const { id } = useParams()
  const LOCAL_STORAGE_KEY = `mobile_${id}`
  const TIMESTAMP_KEY = `mobileTimestamp_${id}`
  const cartDefaultValue = parseInt(localStorage.getItem(LOCAL_STORAGE_CART_KEY)) || 0

  const [mobile, setMobile] = useState(emptyMobile)
  const [selectedColor, setSelectedColor] = useState(emptySelection)
  const [selectedStorage, setSelectedStorage] = useState(emptySelection)
  const [cartCount, setCartCount] = useState(cartDefaultValue)

  const fetchFromCache = async() => {
    const jsonData = await JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    setMobile(jsonData)
  }

  const fetchFromAPI = async() => {
    const data = await fetch(`${BASE_URL}${PRODUCTS_ENDPOINT}/${id}`)
    const jsonData = await data.json()
    setMobile(jsonData)
    setCache(jsonData, LOCAL_STORAGE_KEY, TIMESTAMP_KEY)
  }

  useEffect(() => {
    isCacheExpired(LOCAL_STORAGE_KEY, TIMESTAMP_KEY) ? fetchFromAPI() : fetchFromCache()
    isCacheExpired(LOCAL_STORAGE_CART_KEY, TIMESTAMP_CART_KEY) && setCache(0, LOCAL_STORAGE_CART_KEY, TIMESTAMP_CART_KEY)
  }, [])


  useEffect(() => {
    setSelectedColor(mobile.options.colors[0])
    setSelectedStorage(mobile.options.storages[0])
  }, [mobile])

  const handleSelectedColor = (event) => {
    const colorOption = mobile.options.colors.find(color => color.code.toString() === event.target.value)
    setSelectedColor(colorOption)
  }

  const handleSelectedStorage = (event) => {
    const storageOption = mobile.options.storages.find(storage => storage.code.toString() === event.target.value)
    setSelectedStorage(storageOption)
  }

  const postCart = async(addToCartBody) => {
    const response = await fetch(`${BASE_URL}${CART_ENDPOINT}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addToCartBody)
    })
    const jsonResponse = await response.json()
    return jsonResponse
  }

  const handleAddToCart = async() => {
    const addToCartBody = {
      id: mobile.id,
      colorCode: selectedColor.code,
      storageCode: selectedStorage.code
    }

    const jsonData = await postCart(addToCartBody)
    isCacheExpired(LOCAL_STORAGE_CART_KEY, TIMESTAMP_CART_KEY) && setCache(0, LOCAL_STORAGE_CART_KEY, TIMESTAMP_CART_KEY)
    const count = jsonData.count + parseInt(localStorage.getItem(LOCAL_STORAGE_CART_KEY))
    setCache(count, LOCAL_STORAGE_CART_KEY, TIMESTAMP_CART_KEY)
    setCartCount(count)
  }

  return (
    <div className='relative'>
      <div className="px-0 sm:px-5 lg:px-10 items-stretch">
        <Header cartCount={cartCount} />
        <div className='px-10 pb-5'>Detail Page:</div>
        <div className='min-w-[350px] px-10 sm:px-10 md:pr-10 grid grid-cols-1 sm:grid-cols-2 grow'>
          <img 
            className='min-w-[200px] w-[400px] pr-10 mb-5'
            src={mobile.imgUrl} alt={`${mobile.brand}-${mobile.model}`}
          />
          <div>

            <div
              className='p-5 rounded border-2 border-teal-200 text-neutral-600 h-80 mb-5'
            >  
              <div>Description:</div>
              <div className='max-w-sm pb-10'>
                <ul className='list-disc text-xs pl-5'>
                  <li>Brand: {mobile.brand}</li>
                  <li>Model: {mobile.model}</li>
                  <li>Price: {mobile.price} €</li>
                  <li>CPU: {mobile.cpu}</li>
                  <li>RAM: {mobile.ram}</li>
                  <li>OS: {mobile.os}</li>
                  <li>Display Resolution: {mobile.displayResolution}</li>
                  <li>Battery: {mobile.battery}</li>
                  <li>Primary Camera: {mobile.primaryCamera}</li>
                  <li>Secondary Camera: {mobile.secondaryCmera}</li>
                  <li>Dimensions: {mobile.dimentions}</li>
                  <li>Weight: {mobile.weight} g</li>
                </ul>
              </div>
            </div>

            <div
              className='p-5 rounded border-2 border-teal-200 shadow:shadow-2xl text-neutral-600 h-80 grid justify-items-stretch'
            >
              <div>Actions:</div>
              <label htmlFor='storage'>Choose a storage: </label>
              <select name='storage' id='storage' value={selectedStorage.code} onChange={handleSelectedStorage}>
                {mobile.options.storages.map(el => <option key={`storage_${el.code}`} value={el.code}>{el.name}</option>)}
              </select>
              <label className='mt-5' htmlFor='color'>Choose a color: </label>
              <select name='color' id='color' value={selectedColor.code} onChange={handleSelectedColor}>
                {mobile.options.colors.map(el => <option key={`color${el.code}`} value={el.code}>{el.name}</option>)}
              </select>
              <button
                className='mt-8 bg-teal-500 hover:bg-teal-400 text-white font-bold px-3 mt-3 border border-teal-700 rounded'
                onClick={handleAddToCart}
              >
                  Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

DetailPage.propTypes = {
  data: PropTypes.array
}

export default DetailPage
