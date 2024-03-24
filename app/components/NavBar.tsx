import Link from 'next/link';
import React from 'react';
import NavOptions from './NavOptions';

const NavBar = () => {
  const options = [
    { label: 'Load', href: '../pages/loadimages' },
    { label: 'View Images', href: '../pages/sharedimages' }
  ];

  return (
    <div className="mb-3">
      <nav className="rounded-lg navbar font-semibold text-sm shadow-lg shadow-indigo-500/50 font-mono flex justify-between items-center">
        <Link href="/">
          <span className="text-xs px-5 cursor-pointer">Random Infinite Images</span>
        </Link>
        <NavOptions options={options} />
      </nav>
    </div>
  );
};

export default NavBar;