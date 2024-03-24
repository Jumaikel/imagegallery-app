import Link from 'next/link';
import React from 'react';
import NavOptions from './NavOptions';

const NavBar = () => {
  const options = [
    {label: 'Home', href: '../', primary:true},
    { label: 'Load My Own Images', href: '../pages/loadimages', primary:false},
    { label: 'View Community Images', href: '../pages/sharedimages', primary:false}
  ];

  return (
    <div className="mb-3">
      <nav className="rounded-lg navbar font-semibold text-sm shadow-lg shadow-indigo-500/50 font-mono flex justify-between items-center">
          <label className="text-lg px-5">Random Infinite Images</label>
        <NavOptions options={options} />
      </nav>
    </div>
  );
};

export default NavBar;