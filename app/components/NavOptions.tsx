import React from 'react';
import Link from 'next/link';

type Option = {
  label: string;
  href: string;
  primary: boolean;
};

const NavOptions: React.FC<{ options: Option[] }> = ({ options }) => {
  return (
    <div className="flex space-x-4 text-base">
      {options.map((option, index) => (
        <Link key={index} href={option.href} passHref>
          {option.primary ? (
            <div className="text-indigo-500 hover:text-cyan-300 hover:rounded-lg px-5 transition-colors duration-300 cursor-pointer">
              {option.label}
            </div>
          ) : (
              <div className="hover:text-cyan-300 shadow-indigo-500 hover:rounded-lg px-5 transition-colors duration-300 cursor-pointer">
              {option.label}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default NavOptions;