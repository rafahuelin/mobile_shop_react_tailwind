import React from 'react'


const Header = () => {
  return (
    <ul className='flex justify-between px-10 py-5'>
      <li className='mr-6'>
        <a className='text-teal-500 hover:text-teal-800' href='/'>Mobile Shop</a>
      </li>
      <li className='text-teal-500 hover:text-teal-800'>Cart 0</li>
    </ul>
  )
}

export default Header
