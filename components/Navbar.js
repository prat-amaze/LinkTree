"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const showNavbar = ["/", "/generate"].includes(pathname);

  return (
    <>
      {showNavbar && (
        <nav className="bg-white p-3 w-[90vw] md:w-[80vw] fixed top-0 left-[5vw] md:left-[10vw] rounded-full flex flex-row justify-between items-center shadow-md z-50">
          <div className="logo flex gap-10 items-center">
            <Link href="/">
              <img
                className="h-6"
                src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg"
                alt="logo"
              />
            </Link>

            <ul className="hidden md:flex gap-6">
              {["Products", "Templates", "Marketplace", "Learn", "Pricing"].map(
                (item) => (
                  <li
                    key={item}
                    className="hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
                  >
                    <Link href="/">{item}</Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="font-bold text-lg flex gap-2">
            <Link href="/login">
              <button className="bg-[#eff0ec] p-3 rounded-2xl hover:bg-[#e5e6e3]">
                Log in
              </button>
            </Link>
            <Link href="/generate">
              <button className="bg-[#1e2330] p-3 rounded-full text-white hover:bg-[#262d3f]">
                Sign up free
              </button>
            </Link>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
