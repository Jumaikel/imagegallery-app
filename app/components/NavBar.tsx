import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div className='p-10 text-lg '>
    <nav className='bg-slate-600 rounded-lg navbar'>
      
    <label className=' text-3xl px-5 font-bold'>Infinite Images</label>
    <label className=' hover:text-teal-400 hover:text-xl px-5'>Load</label>
    <label className=' hover:text-teal-400 hover:text-xl px-5 '>View Images</label>
    
    </nav>
    </div>
  )
}

export default NavBar