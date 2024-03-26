import React from "react";
import Link from "next/link";

type Option = {
  label: string;
  href: string;
  primary: boolean;
};
const NavOptions: React.FC<{ options: Option[] }> = ({ options }) => {
  return (
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-base my-2">
      {options.map((option, index) => (
        <Link
        key={index}
        href={option.href}
        className={`border border-gray-700 ${
          option.label === "Load My Own Images"
            ? "bg-blue-950 text-white"
            : "text-gray-400 hover:text-gray-200 hover:border-gray-500"
        } rounded-lg px-5 py-1 transition-colors duration-300 cursor-pointer w-full sm:w-auto text-center`}
        passHref
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
};

export default NavOptions;
