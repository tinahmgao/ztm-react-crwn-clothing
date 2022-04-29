import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import './cart-icon.styles.scss'

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, cartItemsCount } =
        useContext(CartContext)

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    return (
        <div className="cart-icon-container">
            <ShoppingIcon className="shopping-icon" onClick={toggleCart} />
            <span className="item-count">{cartItemsCount}</span>
        </div>
    )
}

export default CartIcon
