import PropTypes from 'prop-types'
import React from 'react'


const Search = ({handleSearch}) => {

  return (
    <>
      <div className='float-right px-10'>
        <input type='search' className='border-2 border-teal-200 rounded p-3' placeholder='Search by brand or model...' onChange={handleSearch} />
        <div className='absolute pin-r pin-t px-10 mt-3 mr-4 text-purple-lighter'>

        </div>
      </div>
      <div className='clear-both'></div>
    </>    
  )
}

Search.propTypes = {
  handleSearch: PropTypes.func
}

export default Search
