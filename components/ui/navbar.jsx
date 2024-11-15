import Link from "next/link";
import { useState } from "react";
import cn from "classnames";
import SignIn from "@/components/auth/signin";

export default function NavBar() {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-black h-16">
      <div className="flex flex-wrap items-center justify-between lg:container py-2 mx-auto md:flex-no-wrap md:px-2">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-lg md:text-3xl font-bold ml-3 text-white"
          >
            Dragon's Gallery
          </Link>
        </div>

        <button
          className="flex items-center px-3 py-2 text-white border border-white rounded md:hidden"
          onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
        >
          <svg
            className="w-3 h-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>

        <ul
          className={cn(
            "bg-black pl-2 md:flex flex-col md:flex-row md:items-center md:justify-center text-sm w-full md:w-auto",
            mobileMenuIsOpen ? `block` : `hidden`
          )}
        >
          <li className="mt-3 md:mt-0 md:ml-6">
            <Link href="/" className="block text-white">
              Home
            </Link>
          </li>
          <li className="mt-3 md:mt-0 md:ml-6">
            <Link href="/about" className="block text-white">
              About
            </Link>
          </li>
          <li className="mt-3 md:mt-0 md:ml-6">
            <Link href="/bycategories" className="block text-white">
              Collection
            </Link>
          </li>
          <li className="mt-3 md:mt-0 md:ml-6">
            <SignIn />
          </li>
        </ul>
      </div>
    </header>
  );
}