import Link from 'next/link'
import React, { useState } from 'react'
import NavOptions from './NavOptions'

const NavBar = () => {
  const options = ['Load', 'View Images']; 
  return (
    <div className='p-5 mb-8'>
    <nav className='rounded-lg navbar font-semibold  text-sm shadow-lg shadow-indigo-500/50 font-mono  flex justify-between'>
    <label className='text-lg px-5'>Random Infinite Images</label>
    <NavOptions options={options}/>
    </nav>
    </div>
    
  )
}
export default NavBar