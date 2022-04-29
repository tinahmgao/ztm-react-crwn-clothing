import { createContext, useEffect, useState } from 'react'

const increaseCartItem = (cartItems, productToIncrease) => {
    return cartItems.map((cartItem) =>
        cartItem.id === productToIncrease.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
    )
}

const decreaseCartItem = (cartItems, productToDecrease) => {
    if (productToDecrease.quantity > 1) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToDecrease.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
        )
    }

    return removeCartItem(cartItems, productToDecrease)
}

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToadd
    const isItemExisting = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    )
    //If found, increment quantity
    if (isItemExisting) {
        return increaseCartItem(cartItems, productToAdd)
    }
    //otherwise return new array with modified cartitems
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToRemove) => {
    return cartItems.filter((item) => item.id !== productToRemove.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    totalAmount: 0,
    setIsCartOpen: () => {},
    addItemToCart: () => {},
    increaseItemToCart: () => {},
    decreaseItemFromCart: () => {},
    removeItemFromCart: () => {},
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartItemsCount, setCartItemsCount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        const newCartItemsCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        )
        setCartItemsCount(newCartItemsCount)

        const newTotalAmount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        )

        setTotalAmount(newTotalAmount)
    }, [cartItems])

    const increaseItemToCart = (productToIncrease) => {
        setCartItems(increaseCartItem(cartItems, productToIncrease))
    }

    const decreaseItemFromCart = (productToDecrease) => {
        setCartItems(decreaseCartItem(cartItems, productToDecrease))
    }

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const value = {
        isCartOpen,
        cartItems,
        cartItemsCount,
        totalAmount,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        increaseItemToCart,
        decreaseItemFromCart,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
