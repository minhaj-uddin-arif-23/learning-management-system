"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Dashboard", href: "/admin" }, // Admin dashboard
    { name: "My Learning", href: "/learning" }, // User panel
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-green-600">
            LMS
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-green-600 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 py-3 space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-gray-700 hover:text-green-600 transition"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex space-x-4 mt-4">
              <Link
                href="/login"
                className="w-1/2 text-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="w-1/2 text-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
