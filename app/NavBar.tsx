'use client'

import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import { usePathname } from 'next/navigation';

const NavBar = () => {

    const currentPath = usePathname();

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]

  return (
    <nav className='border-b border-foreground/10 text-foreground flex gap-8 items-center p-4'>
        <Link href='/' className='flex items-center'>
            <AiFillBug className='text-2xl' />
        </Link>
        <ul className='flex gap-6'> 
            {links.map((link) => (
                <li key={link.href}>
                    <Link 
                        href={link.href} 
                        className={`hover:text-zinc-800 transition-colors ${currentPath === link.href ? 'text-zinc-900' : 'text-zinc-500'}`}>
                            {link.label}
                    </Link>
                </li>
            ))} 
        </ul>
    </nav>
  )
}

export default NavBar