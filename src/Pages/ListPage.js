import PropTypes from 'prop-types'
import React from 'react'
import ListItem from '../Components/ListItem'


const ListPage = ({data}) => (
  <div>
    <h1>ListPage</h1>
    <div>
      <ul>
        { data.map(mobile => <ListItem key={mobile.id} mobile={mobile} />) }
      </ul>
    </div>
  </div>
)


ListPage.propTypes = {
  data: PropTypes.array
}

export default ListPage
