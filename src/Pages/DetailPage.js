import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Components/Header'
import { isCacheExpired, setCache } from '../utils/cache'
import { PRODUCTS_URL } from '../api/endpoints'


const DetailPage = () => {
  const emptyMobile = {
    options: {
      storages: ['-'],
      colors: ['-']
    }
  }
  const emptySelection = {code: '-', name: '-'}
  const [mobile, setMobile] = useState(emptyMobile)
  const [selectedColor, setSelectedColor] = useState(emptySelection)
  const [selectedStorage, setSelectedStorage] = useState(emptySelection)
  const { id } = useParams()
  const LOCAL_STORAGE_KEY = `mobile_${id}`
  const TIMESTAMP_KEY = `mobileTimestamp_${id}`

  const fetchFromCache = () => {
    const jsonData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    setMobile(jsonData)
    setSelectedColor(mobile.options.colors[0])
    setSelectedStorage(mobile.options.storages[0])
  }

  const fetchFromAPI = async() => {
    const data = await fetch(`${PRODUCTS_URL}/${id}`)
    const jsonData = await data.json()
    setMobile(jsonData)
    setCache(jsonData, LOCAL_STORAGE_KEY, TIMESTAMP_KEY)
    setSelectedColor(mobile.options.colors[0])
    setSelectedStorage(mobile.options.storages[0])
  }

  useEffect(() => {
    isCacheExpired(LOCAL_STORAGE_KEY, TIMESTAMP_KEY) ? fetchFromAPI() : fetchFromCache()
  }, [])

  

  const handleSelectedColor = (event) => {
    const colorOption = mobile.options.colors.find(color => color.code.toString() === event.target.value)
    setSelectedColor(colorOption)
  }

  const handleSelectedStorage = (event) => {
    const storageOption = mobile.options.storages.find(storage => storage.code.toString() === event.target.value)
    setSelectedStorage(storageOption)
  }

  const handleAddToCart = () => {
    const addToCartBody = {
      id: mobile.id,
      colorCode: selectedColor.code,
      storageCode: selectedStorage.code
    }

    console.log('*** addToCartBody', addToCartBody)
    // TODO: Post Request with body to endpoint https://front-test-api.herokuapp.com/api/cart
  }

  return (
    <>
      <Header />
      <div className='px-10 pb-5'>Detail Page:</div>
      <div className='min-w-[260px] md:px-10 sm:px-5 grid grid-cols-1 sm:grid-cols-2'>
        <img className='min-w-[200px] w-[400px] px-10 mb-5' src={mobile.imgUrl} alt={`${mobile.brand}-${mobile.model}`} />
        <div>

          <div
            className='p-5 rounded border-2 border-teal-200 shadow:shadow-2xl text-neutral-600 h-80 mb-5'
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
    </>
  )
}

DetailPage.propTypes = {
  data: PropTypes.array
}

export default DetailPage
