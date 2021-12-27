import React from 'react'
import PropTypes from 'prop-types'
import { InlineIcon } from '@iconify/react'
import bxCart from '@iconify/icons-bx/bx-cart'
import bxMobile from '@iconify/icons-bx/bx-mobile'


const Header = ({cartCount}) => (
  <ul className='flex justify-between px-10 py-5'>
    <li className='mr-6'>
      <a className='text-teal-500 hover:text-teal-800' href='/'><InlineIcon className='inline-block' icon={bxMobile} /> Mobile Shop</a>
    </li>
    <li className='text-teal-500 hover:text-teal-800'><div><InlineIcon className='inline-block' icon={bxCart} /> {parseInt(cartCount)}</div></li>
  </ul>
)

Header.propTypes = {
  cartCount: PropTypes.number
}

export default Header
