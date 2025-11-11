"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="navbar z-50 sticky top-0 flex justify-between items-center px-10 py-4 bg-indigo-200 backdrop-blur-md shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition">
        <Link href="/">Afeef M</Link>
      </h3>

      <div className="hidden md:flex gap-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-gray-700 font-medium hover:text-blue-600 transition duration-300 ${
              pathname === link.href ? "text-blue-600 font-semibold" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex flex-col justify-center items-center gap-1.5"
      >
        <span
          className={`block h-0.5 w-6 bg-indigo-400 transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></span>
        <span
          className={`block h-0.5 w-6 bg-indigo-400 transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block h-0.5 w-6 bg-indigo-400 transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></span>
      </button>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-transparent
         backdrop-blur-md shadow-lg flex flex-col items-center gap-6 py-6 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-indigo-700 font-medium hover:text-blue-600 transition ${
                pathname === link.href ? "text-blue-600 font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
