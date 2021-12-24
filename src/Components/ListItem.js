import PropTypes from 'prop-types'
import React from 'react'
import { useNavigate } from 'react-router-dom'


const ListItem = ({mobile}) => {
  const navigate = useNavigate()
  
  return (
    <div
      className="p-10 cursor-pointer rounded border-2 border-teal-200 hover:border-teal-400 shadow:shadow-2xl h-full"
      onClick={() => navigate(`/${mobile.id}`)}
    >  
      <div className="max-w-sm overflow-hidden">
        <img className="w-full" src={mobile.imgUrl} alt={`${mobile.brand}-${mobile.model}`} />
        <div className="px-0 py-4">
          <div className="font-bold text-xl mb-2 grow">{mobile.model} <span className="text-sm">{mobile.brand}</span></div>
          <p className="text-gray-700 text-base">
            {mobile.price}€
          </p>
        </div>
      </div>
    </div>
  )
}

ListItem.propTypes = {
  mobile: PropTypes.object
}

export default ListItem