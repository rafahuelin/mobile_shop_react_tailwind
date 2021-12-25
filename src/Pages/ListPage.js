import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Header from '../Components/Header'
import ListItem from '../Components/ListItem'
import Search from '../Components/Search'


const ListPage = () => {
  const data = [
    {'id':'ZmGrkLRPXOTpxsU4jjAcv','brand':'Acer','model':'Iconia Talk S','price':'170','imgUrl':'https://front-test-api.herokuapp.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg'},
    {'id':'cGjFJlmqNPIwU59AOcY8H','brand':'Acer','model':'Liquid Z6 Plus','price':'250','imgUrl':'https://front-test-api.herokuapp.com/images/cGjFJlmqNPIwU59AOcY8H.jpg'},
    {'id':'8hKbH2UHPM_944nRHYN1n','brand':'Acer','model':'Liquid Z6','price':'120','imgUrl':'https://front-test-api.herokuapp.com/images/8hKbH2UHPM_944nRHYN1n.jpg'}
  ]

  const [filteredData, setFilteredData] = useState(data)

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase()
    searchValue !== '' && setFilteredData(data.filter(mobile => {
      const brand = mobile.brand.toLowerCase()
      const model = mobile.model.toLowerCase()
      const isMatch = brand.includes(searchValue) || model.includes(searchValue)
      return isMatch
    }))

    searchValue === '' && setFilteredData(data)
  }

  return <div className='relative'>
    <div className="px-0 sm:px-5 md:px-10 items-stretch">
      <Header />
      <div className='min-w-min'>
        <Search handleSearch={handleSearch} />
        <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 grow">
          { filteredData.map(mobile => <ListItem key={mobile.id} mobile={mobile} />) }
        </div>
      </div>
      
    </div>
  </div>
}


ListPage.propTypes = {
  data: PropTypes.array
}

export default ListPage
