/* eslint-disable */
import React from 'react'
import { BrowserRouter, Route, Routes, matchPath, matchRoutes, useLocation } from 'react-router-dom'
import ListPage from './Pages/ListPage'
import DetailPage from './Pages/DetailPage'


const data = [
  {'id':'ZmGrkLRPXOTpxsU4jjAcv','brand':'Acer','model':'Iconia Talk S','price':'170','imgUrl':'https://front-test-api.herokuapp.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg'},
  {'id':'cGjFJlmqNPIwU59AOcY8H','brand':'Acer','model':'Liquid Z6 Plus','price':'250','imgUrl':'https://front-test-api.herokuapp.com/images/cGjFJlmqNPIwU59AOcY8H.jpg'},
  {'id':'8hKbH2UHPM_944nRHYN1n','brand':'Acer','model':'Liquid Z6','price':'120','imgUrl':'https://front-test-api.herokuapp.com/images/8hKbH2UHPM_944nRHYN1n.jpg'}
]

function App() {
  return (
    <div>
      <h1>App</h1>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ListPage data={data} />}
          />
          <Route
            path='/:id'
            element={<DetailPage data={data} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
