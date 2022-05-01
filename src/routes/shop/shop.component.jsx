import { Routes, Route } from 'react-router-dom'

import CategoriesPreview from '../categories-preview/categories-preview.component'

import './shop.styles.scss'

const Shop = () => {
    return (
        <Routes>
            <Route
                index
                element={
                    <div className="shop-container">
                        <CategoriesPreview />
                    </div>
                }
            />
        </Routes>
    )
}

export default Shop
