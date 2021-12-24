import PropTypes from 'prop-types'
import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Components/Header'


const DetailPage = ({data}) => {
  const { id } = useParams()
  const mobile = data.find(el => el.id === id)
  return (
    <>
      <Header />
      <div>Detail Page: {JSON.stringify(mobile)}</div>
    </>
    
  )
}

DetailPage.propTypes = {
  data: PropTypes.array
}

export default DetailPage
