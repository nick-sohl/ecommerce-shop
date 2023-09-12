'use client'

import Image from "next/image"
import { useCardStore } from "@/store"
import formatPrice from "@/util/PriceFormat"
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { motion, AnimatePresence } from "framer-motion"

import basket from '@/public/basket.png'

export default function Cart() {
    const cartStore = useCardStore()

    // Total Price
    const totalPrice = cartStore.cart.reduce((acc, item) => {
        return acc + item.unit_amount! * item.quantity!
    }, 0)
    
    return (
        <motion.div
            animate={{opacity: 1}}
            initial={{opacity: 0}}
            exit={{opacity: 0}}
            onClick={() => cartStore.toggleCart()} 
            className="fixed w-full h-screen left-0 top-0 bg-black/25"
        >
            <motion.div
            layout
            // Stops the onClick from the parent div. So you can't toggle away the cart by clicking on it.
            onClick={ (e) => e.stopPropagation() }
            className="bg-white absolute right-0 top-0 sm:w-full md:w-2/5 xl:w-1/4 h-screen p-6 overflow-y-scroll text-gray-700 flex flex-col gap-8"
            >
                <h1 className="text-2xl font-bold">Shopping Cart</h1>
                {cartStore.cart.map((item) => (
                    <motion.div layout key={item.id} className="flex flex-col gap-2">
                        <div className="w-full aspect-3/2">
                            <Image
                                src={item.image} alt={item.name} width={120} height={120}
                                className='w-full object-cover'
                            >
                            </Image>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h2 className="text-base font-bold">{item.name}</h2>
                            {/* Update quantity of a product */}
                            <div>
                                <h2 className="text-base mb-2">Quantity: {item.quantity}</h2>
                                <div className="flex justify-between text-4xl text-teal-500 border-2 border-teal-500 rounded-full">
                                    <button
                                        className="hover:text-pink-900"
                                        onClick={ () =>
                                            cartStore.removeProduct({
                                                id: item.id,
                                                name: item.name,
                                                image: item.image,
                                                unit_amount: item.unit_amount,
                                                quantity: item.quantity
                                            })}
                                    >
                                        <IoRemoveCircle />
                                    </button>
                                    <button
                                        className="hover:text-teal-900"
                                        onClick={ () =>
                                            cartStore.addProduct({
                                                id: item.id,
                                                name: item.name,
                                                image: item.image,
                                                unit_amount: item.unit_amount,
                                                quantity: item.quantity
                                            })}
                                    >
                                        <IoAddCircle />
                                    </button>
                                </div>
                            </div>
                            <p className="text-base font-bold">{item.unit_amount && formatPrice(item.unit_amount)}</p>
                        </div>
                    </motion.div>
                ))}
                <button
                    onClick={ () => cartStore.toggleCart() }
                    className="flex items-center gap-2 font-bold absolute bottom-10 hover:text-teal-400 sm:text-2xl">
                    <IoIosArrowRoundBack /> 
                    <h3>Back to Store</h3>
                </button>
                {/* Checkout and Total*/}
                <motion.div layout>
                    {cartStore.cart.length > 0 && 
                        <div>
                            <p>Total: {formatPrice(totalPrice)}</p>
                            <button
                                className="bg-teal-500 hover:bg-transparent hover:border 1 border-teal-500 w-full px-4 py-2 rounded-md text-white hover:text-teal-500 font-bold">
                                Check Out
                            </button>
                        </div>
                    }
                </motion.div>
                <AnimatePresence>
                    {cartStore.cart.length < 1 &&
                        <motion.div
                            animate={{scale: 1, rotateZ: 0, opacity: 0.75 }}
                            initial={{scale: 0.5, rotateZ: -10, opacity: 0}}
                            className="flex flex-col items-center gap-12">
                            <h3 className="text-xl  font-medium text-center">Uhhh ohhh... it's empty</h3>
                            <Image 
                                className="w-1/2 object-contain"
                                src={basket}
                                alt={'empty-cart'}
                                width={200}
                                height={200}>
                            </Image>
                        </motion.div>
                    }
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}