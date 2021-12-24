import PropTypes from 'prop-types'
import React from 'react'


const MobileItem = ({mobile}) => (
  <li key={mobile}>{mobile}</li>
)

MobileItem.propTypes = {
  mobile: PropTypes.string
}

export default MobileItem
