import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import './cart-icon.styles.scss'

const CartIcon = ({ showCart, setShowCart }) => {
    const { isCartOpen, setIsCartOpen } = useContext(CartContext)

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    return (
        <div className="cart-icon-container">
            <ShoppingIcon className="shopping-icon" onClick={toggleCart} />
            <span className="item-count">0</span>
        </div>
    )
}

export default CartIcon
