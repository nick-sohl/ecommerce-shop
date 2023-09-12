'use client'

import { Session } from "next-auth"
import {signIn, signOut} from 'next-auth/react'
import Image from "next/image"
import Link from 'next/link'
import Cart from './Cart'
import { useCardStore } from "@/store"
import { motion, AnimatePresence } from 'framer-motion'

import { CgShoppingBag } from 'react-icons/cg'

export default function Nav({user}: Session) {

    const cartStore = useCardStore()

    return (
        <nav className="flex justify-between items-center py-8">
            <Link href={'/'}>            
                <h1 className="uppercase font-bold border-b-4 border-teal-400">Styled</h1>
            </Link>
            <ul className="flex items-center gap-8">
                {/* Toggle the cart */}
                <li onClick={ () => cartStore.toggleCart() } className="text-teal-400 text-3xl relative cursor-pointer">
                    {<CgShoppingBag />}
                    {cartStore.cart.length > 0 &&
                        <motion.span animate={{scale: 1}} initial={{scale: 0}}  className="flex justify-center items-center bg-teal-500 text-white text-sm font-bold w-[25px] h-[25px] rounded-full absolute left-4 bottom-4">
                            {cartStore.cart.length}
                        </motion.span>
                    }
                </li>
                {/* If the user is not signed in */}
                {!user && (
                    <li className="bg-teal-600 hover:bg-teal-400 active:bg-teal-800 text-white py-2 px-4 rounded-md">
                        <button onClick={() => signIn()}>Sign In</button>  
                    </li>
                )}
                {/* If the user is signed in */}
                {user && (
                    <>
                    <li>
                        <Image
                            src={user?.image as string}
                            alt={user.name as string}
                            width={48}
                            height={48}
                            className='rounded-full'
                        />
                    </li>
                    <li className="border-2 border-solid border-teal-600 hover:bg-teal-600 hover:text-white px-4 py-2 rounded-md ">
                        <button onClick={ () => signOut() }>Log Out</button>
                    </li>
                    </>
                )}
            </ul>
            <AnimatePresence>
                {cartStore.isOpen && <Cart />}
            </AnimatePresence>
        </nav>
    )
}