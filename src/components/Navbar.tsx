'use client';

import React from 'react'
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';

function Navbar() {
    const {data: session} = useSession();

    const user = session?.user;

    return (
        <nav className='p-4 md:p-6 bg-gray-500 text-white'>
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <a href="#">
                    Mystery Message
                </a>
                {
                    session ? (
                        <>
                        <span className='mr-4'>Welcome, {user?.username || user?.email}</span>
                        <Button onClick={() => signOut()} className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>
                            Logout
                        </Button>
                        </>
                    ) : (
                        <Link href={'/sign-in'}>
                            <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>
                                Sign In
                            </Button>
                        </Link>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar