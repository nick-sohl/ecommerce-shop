'use client'

import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useCardStore } from '@/store'
import { useState, useEffect } from 'react'

// When you want to fetch Data with proces.env you need NEXT_PUBLIC as a prefix.
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function Checkout() {
    const cartStore = useCardStore()
    const [clientSecret, setClientSecret] = useState('')

    useEffect( () => {
        // create a paymentIntent as soon as the page loads up
        fetch('/api/create-paymentIntent', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                items: cartStore.cart,
                payment_intent_id: cartStore.paymentIntent,
            })
        }).then((res) => {
            console.log(res);
            // SET CLIENT SECRET and the payment intent associated with it
        })
    }, [] )
}