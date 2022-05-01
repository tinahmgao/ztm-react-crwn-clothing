import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles'

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartItemsCount } =
        useContext(CartContext)

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    return (
        <CartIconContainer>
            <ShoppingIcon onClick={toggleCart} />
            <ItemCount className="item-count">{cartItemsCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon
