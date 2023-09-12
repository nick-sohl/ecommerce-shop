'use client'

import { useCardStore } from "@/store"
import { AddCartType } from "@/types/AddCartType"
import { motion } from "framer-motion"

export default function AddCart({name, id, image, unit_amount, quantity}: AddCartType) {

    const cartStore = useCardStore()

    return (
        <>
            <button
                onClick={() => cartStore.addProduct({id, image, unit_amount, quantity, name})} className='bg-teal-400 hover:bg-teal-200 px-8 py-4 w-fit rounded-md text-white hover:text-black font-medium'
            >
                Add to Cart
            </button>
        </>
    )
}