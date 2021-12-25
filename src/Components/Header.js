import React from 'react'


const Header = () => {
  const cartValue = localStorage.getItem('cart') || '0'

  return (
    <ul className='flex justify-between px-10 py-5'>
      <li className='mr-6'>
        <a className='text-teal-500 hover:text-teal-800' href='/'>Mobile Shop</a>
      </li>
      <li className='text-teal-500 hover:text-teal-800'>Cart {cartValue}</li>
    </ul>
  )
}

export default Header
