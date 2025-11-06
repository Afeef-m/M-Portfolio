"use client"
import React from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { usePathname } from 'next/navigation'
import { useGSAP } from '@gsap/react'

export default function Navbar() {
  const pathname = usePathname()
  useGSAP(()=>{
  const tl =gsap.timeline()
  tl.from(".navbar",{
    display:"none",
    y:100,
    opacity:0,
    duration:1,
    ease:"power2.inOut",
    delay:1
  })

  },[])

  const links= [
    {href:"/" ,label:"Home"},
    {href:"/about" ,label:"About"},
    {href:"/project" ,label:"Project"},
    {href:"/contact" ,label:"Contact"},

  ]
  return (
    <nav className='navbar flex justify-between items-center px-10 py-4 shadow-md'>
        <h3 className='text-xl font-bold text-gray-800'>Afeef M</h3>
      <div className='flex gap-6'>
        {links.map((link)=>(
            <Link key={link.href} href={link.href}
            className={`text-gray-600 hover:text-blue-600 transition 
              ${pathname === link.href ? "font-semibold text-blue-600":""}`}
            >{link.label}</Link>
        ))}
      </div>
    </nav>
  )
}

 