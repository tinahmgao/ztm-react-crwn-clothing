import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'

import './checkout.styles.scss'

const Checkout = () => {
    const {
        cartItems,
        totalAmount,
        removeItemFromCart,
        increaseItemToCart,
        decreaseItemFromCart,
    } = useContext(CartContext)

    return (
        <div
            style={{ display: 'flex', flexDirection: 'column', rowGap: '2rem' }}
        >
            {cartItems.map((cartItem) => {
                const { id, name, price, quantity } = cartItem
                return (
                    <div key={id} style={{ display: 'flex', gap: '2rem' }}>
                        <p>{name}</p>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <button
                                style={{
                                    backgroundColor: 'white',
                                    border: 'none',
                                    fontWeight: 'bold',
                                }}
                                onClick={() => {
                                    decreaseItemFromCart(cartItem)
                                }}
                            >
                                {'<'}
                            </button>
                            <span>{quantity}</span>
                            <button
                                style={{
                                    backgroundColor: 'white',
                                    border: 'none',
                                    fontWeight: 'bold',
                                }}
                                onClick={() => {
                                    increaseItemToCart(cartItem)
                                }}
                            >
                                {'>'}
                            </button>
                        </div>
                        <p>{price}</p>
                        <button
                            style={{
                                backgroundColor: 'white',
                                border: 'none',
                            }}
                            onClick={() => removeItemFromCart(cartItem)}
                        >
                            X
                        </button>
                    </div>
                )
            })}
            <h2>TOTAL: ${totalAmount}</h2>
        </div>
    )
}

export default Checkout
