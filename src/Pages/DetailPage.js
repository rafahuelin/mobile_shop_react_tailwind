import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Components/Header'


const DetailPage = () => {
  const data = [
    {'id':'ZmGrkLRPXOTpxsU4jjAcv','brand':'Acer','model':'Iconia Talk S','price':'170','imgUrl':'https://front-test-api.herokuapp.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg','networkTechnology':'GSM / HSPA / LTE','networkSpeed':'HSPA 42.2/11.5 Mbps  LTE Cat4 150/50 Mbps','gprs':'Yes','edge':'Yes','announced':'2016  August','status':'Available. Released 2016  October','dimentions':'191.7 x 101 x 9.4 mm (7.55 x 3.98 x 0.37 in)','weight':'260','sim':'Dual SIM (Micro-SIM/Nano-SIM)','displayType':'IPS LCD capacitive touchscreen  16M colors','displayResolution':'7.0 inches (~69.8% screen-to-body ratio)','displaySize':'720 x 1280 pixels (~210 ppi pixel density)','os':'Android 6.0 (Marshmallow)','cpu':'Quad-core 1.3 GHz Cortex-A53','chipset':'Mediatek MT8735','gpu':'Mali-T720MP2','externalMemory':'microSD  up to 128 GB (dedicated slot)','internalMemory':['16 GB','32 GB'],'ram':'2 GB RAM','primaryCamera':['13 MP','autofocus'],'secondaryCmera':['2 MP','720p'],'speaker':'Yes','audioJack':'Yes','wlan':['Wi-Fi 802.11 a/b/g/n','Wi-Fi Direct','hotspot'],'bluetooth':['4.0','A2DP'],'gps':'Yes with A-GPS GLONASS','nfc':'','radio':'FM radio','usb':'microUSB 2.0','sensors':['Accelerometer','proximity'],'battery':'Non-removable Li-Ion 3400 mAh battery (12.92 Wh)','colors':['Black'],'options':{'colors':[{'code':1000,'name':'Black'}],'storages':[{'code':2000,'name':'16 GB'},{'code':2001,'name':'32 GB'}]}},
    {'id':'cGjFJlmqNPIwU59AOcY8H','brand':'Acer','model':'Liquid Z6 Plus','price':'250','imgUrl':'https://front-test-api.herokuapp.com/images/cGjFJlmqNPIwU59AOcY8H.jpg','networkTechnology':'GSM / HSPA / LTE','networkSpeed':'HSPA 42.2/5.76 Mbps  LTE Cat4 150/50 Mbps','gprs':'Yes','edge':'Yes','announced':'2016  August','status':'Available. Released 2016  December','dimentions':'153.8 x 75.6 x 8.5 mm (6.06 x 2.98 x 0.33 in)','weight':'169','sim':['Single SIM (Micro-SIM) or Dual SIM (Micro-SIM','dual stand-by)'],'displayType':'IPS LCD capacitive touchscreen  16M colors','displayResolution':'5.5 inches (~71.7% screen-to-body ratio)','displaySize':'1080 x 1920 pixels (~401 ppi pixel density)','os':'Android 6.0 (Marshmallow)','cpu':'Octa-core 1.3 GHz Cortex-A53','chipset':'Mediatek MT6753','gpu':'Mali-T720MP3','externalMemory':'microSD  up to 256 GB (uses SIM 2 slot)','internalMemory':['32 GB'],'ram':'3 GB RAM','primaryCamera':['13 MP','autofocus','LED flash'],'secondaryCmera':'5 MP','speaker':'Yes','audioJack':'Yes','wlan':['Wi-Fi 802.11 b/g/n','Wi-Fi Direct','hotspot'],'bluetooth':['4.0','A2DP'],'gps':'Yes with A-GPS','nfc':'','radio':'FM radio','usb':'microUSB 2.0','sensors':['Fingerprint (front-mounted)','accelerometer','proximity'],'battery':'Removable Li-Po 4080 mAh battery','colors':['Black','White'],'options':{'colors':[{'code':1000,'name':'Black'},{'code':1001,'name':'White'}],'storages':[{'code':2000,'name':'32 GB'}]}},
    {'id':'8hKbH2UHPM_944nRHYN1n','brand':'Acer','model':'Liquid Z6','price':'120','imgUrl':'https://front-test-api.herokuapp.com/images/8hKbH2UHPM_944nRHYN1n.jpg','networkTechnology':'GSM / HSPA / LTE','networkSpeed':'HSPA  LTE','gprs':'Yes','edge':'Yes','announced':'2016  August','status':'Available. Released 2016  December','dimentions':'-','weight':'','sim':['Single SIM (Micro-SIM) or Dual SIM (Micro-SIM','dual stand-by)'],'displayType':'IPS LCD capacitive touchscreen  16M colors','displayResolution':'5.0 inches','displaySize':'720 x 1280 pixels (~294 ppi pixel density)','os':'Android 6.0 (Marshmallow)','cpu':'Quad-core 1.25 GHz Cortex-A53','chipset':'Mediatek MT6737','gpu':'Mali-T720MP2','externalMemory':'microSD  up to 256 GB','internalMemory':['8 GB'],'ram':'1 GB RAM','primaryCamera':['8 MP','autofocus','LED flash'],'secondaryCmera':'2 MP','speaker':'Yes','audioJack':'Yes','wlan':'Yes','bluetooth':'Yes','gps':'Yes with A-GPS','nfc':'','radio':'FM radio','usb':'microUSB 2.0','sensors':['Accelerometer','proximity'],'battery':'Removable Li-Ion 2000 mAh battery','colors':['Black','White'],'options':{'colors':[{'code':1000,'name':'Black'},{'code':1001,'name':'White'}],'storages':[{'code':2000,'name':'8 GB'}]}},
  ]

  const { id } = useParams()
  const mobile = data.find(el => el.id === id)

  const [selectedColor, setSelectedColor] = useState(mobile.options.colors[0])
  const [selectedStorage, setSelectedStorage] = useState(mobile.options.storages[0])

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
              {mobile.options.storages.map(el => <option key={el.code} value={el.code}>{el.name}</option>)}
            </select>
            <label className='mt-5' htmlFor='color'>Choose a color: </label>
            <select name='color' id='color' value={selectedColor.code} onChange={handleSelectedColor}>
              {mobile.options.colors.map(el => <option key={el.code} value={el.code}>{el.name}</option>)}
            </select>
            <button
              className="mt-8 bg-teal-500 hover:bg-teal-400 text-white font-bold px-3 mt-3 border border-teal-700 rounded"
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
