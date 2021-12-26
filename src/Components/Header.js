import React from 'react'
import { InlineIcon } from '@iconify/react'
import bxCart from '@iconify/icons-bx/bx-cart'
import bxMobile from '@iconify/icons-bx/bx-mobile'


const Header = () => {
  const cartValue = localStorage.getItem('cart') || '0'

  return (
    <ul className='flex justify-between px-10 py-5'>
      <li className='mr-6'>
        <a className='text-teal-500 hover:text-teal-800' href='/'><InlineIcon className='inline-block' icon={bxMobile} /> Mobile Shop</a>
      </li>
      <li className='text-teal-500 hover:text-teal-800'><div><InlineIcon className='inline-block' icon={bxCart} /> {cartValue}</div></li>
    </ul>
  )
}

export default Header
