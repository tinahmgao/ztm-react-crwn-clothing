import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'

import {
    Quantity,
    CheckoutItemContainer,
    ImageContainer,
    RemoveButton,
} from './checkout-item.styles'

const CheckoutItem = ({ cartItem }) => {
    const { removeItemFromCart, incrementItemToCart, decrementItemFromCart } =
        useContext(CartContext)
    const { name, imageUrl, price, quantity } = cartItem

    const removeHandler = () => removeItemFromCart(cartItem)
    const incrementHandler = () => incrementItemToCart(cartItem)
    const decrementHandler = () => {
        decrementItemFromCart(cartItem)
    }

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name} />
            </ImageContainer>
            <span className="name">{name}</span>
            <Quantity>
                <div className="arrow" onClick={decrementHandler}>
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={incrementHandler}>
                    &#10095;
                </div>
            </Quantity>
            <span className="price">{price}</span>
            <RemoveButton onClick={removeHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem
