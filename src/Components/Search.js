import PropTypes from 'prop-types'
import React from 'react'


const Search = ({handleSearch}) => {

  return (
    <>
      <label htmlFor="mobile-search">Search Mobile:</label>
      <input type="search" id="mobile-search" onChange={handleSearch} />
    </>
  )
}

Search.propTypes = {
  handleSearch: PropTypes.func
}

export default Search
