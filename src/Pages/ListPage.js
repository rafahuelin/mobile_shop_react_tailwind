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
  }

  return <>
    <Header />
    <Search handleSearch={handleSearch} />
    <h1>ListPage</h1>
    <div>
      <ul>
        { filteredData.map(mobile => <ListItem key={mobile.id} mobile={mobile} />) }
      </ul>
    </div>
  </>
}


ListPage.propTypes = {
  data: PropTypes.array
}

export default ListPage
