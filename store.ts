import {create} from 'zustand'
import {persist} from 'zustand/middleware'
import {AddCartType} from './types/AddCartType'


type CartState = {
    isOpen: boolean,
    cart: AddCartType[]
    toggleCart: () => void
    addProduct: (item: AddCartType) => void
    removeProduct: (item: AddCartType) => void
    paymentIntent: string
    onCheckout: string
    setPaymentIntent: (val: string) => void
    setOnCheckout: (val: string) => void
}


export const useCardStore = create<CartState>()(
    persist(
        (set) => ({
        cart: [],
        isOpen: false,
        paymentIntent: '',
        onCheckout: '',
        toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
        addProduct: (item) => set((state) => {
            // check if there is already this item in the cart
            // if it's already inside, only update the quanitity
            const existingItem = state.cart.find(cartItem => cartItem.id === item.id)
            if (existingItem) {
                const updateCart = state.cart.map((cartItem) => {
                    if (cartItem.id === item.id) {
                        // return everything (so everything is like before) but increment only the quantity
                        // (we dont want the same item as two products inside the cart)
                        return {...cartItem, quantity: cartItem.quantity + 1}
                    }
                    return cartItem
                })
                return {cart: updateCart}
            } else {
                return { cart: [ ...state.cart, { ...item, quantity: 1 } ] }
            }
        }),
        removeProduct: (item) =>
        set((state) => {
          //Check if the item exists and remove quantity - 1
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          )
          if (existingItem && existingItem.quantity! > 1) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! - 1 }
              }
              return cartItem
            })
            return { cart: updatedCart }
          } else {
            //Remove item from cart
            const filteredCart = state.cart.filter(
              (cartItem) => cartItem.id !== item.id
            )
            return { cart: filteredCart }
          }
        }),
        setPaymentIntent: (val) => set((set) => ({paymentIntent: val})),
        setOnCheckout: (val) => set((set) => ({onCheckout: val}))
    }),
    {name: 'cart-store'}
    )
)