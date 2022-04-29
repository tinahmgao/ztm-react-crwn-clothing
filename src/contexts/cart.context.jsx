import { createContext, useEffect, useState } from 'react'

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToadd
    const isItemExisting = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    )
    //If found, increment quantity
    if (isItemExisting) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }
    //otherwise return new array with modified cartitems
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartItemsCount, setCartItemsCount] = useState(0)

    useEffect(() => {
        const newCartItemsCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        )
        setCartItemsCount(newCartItemsCount)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartItemsCount,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
