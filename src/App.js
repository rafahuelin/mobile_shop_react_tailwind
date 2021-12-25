import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListPage from './Pages/ListPage'
import DetailPage from './Pages/DetailPage'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<ListPage />}
          />
          <Route
            path='/:id'
            element={<DetailPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
