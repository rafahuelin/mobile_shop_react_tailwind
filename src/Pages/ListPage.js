import PropTypes from 'prop-types'
import React from 'react'
import ListItem from '../Components/ListItem'
import Header from '../Components/Header'


const ListPage = ({data}) => (
  <>
    <Header />
    <h1>ListPage</h1>
    <div>
      <ul>
        { data.map(mobile => <ListItem key={mobile.id} mobile={mobile} />) }
      </ul>
    </div>
  </>
)


ListPage.propTypes = {
  data: PropTypes.array
}

export default ListPage
