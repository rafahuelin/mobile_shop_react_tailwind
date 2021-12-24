import PropTypes from 'prop-types'
import React from 'react'


const ListItem = ({mobile}) => {
  
  return (
    <div>
      { JSON.stringify(mobile) }
    </div>
  )
}

ListItem.propTypes = {
  mobile: PropTypes.object
}

export default ListItem