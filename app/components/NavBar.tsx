import Link from "next/link";
import React from "react";
import NavOptions from "./NavOptions";
import Image from "next/image";

const NavBar = () => {
  const options = [
    { label: "Home", href: "../", primary: true },
    {
      label: "Load My Own Images",
      href: "../pages/loadimages",
      primary: false,
    },
    {
      label: "View Community Images",
      href: "../pages/sharedimages",
      primary: false,
    },
  ];

  return (
    <div className="mb-3">
      <nav className="rounded-lg font-semibold shadow-lg shadow-black/50 font-mono flex justify-between items-center p-2 sm:p-4 bg-gradient-to-r from-black to-blue-950">
        <Link href="/">
          <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer">
            <Image
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Logo"
              width={30}
              height={30}
              className="hidden sm:block"
            />
            <div>
              <span className="text-sm sm:text-xl text-amber-600">
                Random Infinite Images
              </span>
              <h5 className="text-xs sm:text-sm text-indigo-700">
                Explore an endless gallery of images
              </h5>
            </div>
          </div>
        </Link>
        <NavOptions options={options} />
      </nav>
    </div>
  );
};

export default NavBar;
