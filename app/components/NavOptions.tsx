import React from 'react';



function NavOptions({ options }: { options: string[] }) { 
  return (
    <div>
      {options.map((option, index) => (
        <label
          key={index}
          className='hover:text-indigo-500 shadow-indigo-500 hover:rounded-lg px-5 transition-colors duration-300'
        >
          {option}
        </label>
      ))}
    </div>
  );
}

export default NavOptions;