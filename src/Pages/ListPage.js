import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Header from '../Components/Header'
import ListItem from '../Components/ListItem'
import Search from '../Components/Search'


const ListPage = ({data}) => {
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
    <div className="sm:px-10 md:px-20 items-stretch">
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
