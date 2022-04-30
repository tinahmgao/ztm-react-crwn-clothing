import { useContext } from 'react'

import { CategoriesContext } from '../../contexts/categories.context'

import ProductCard from '../../components/product-card/product-card.component'

import './shop.styles.scss'

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext)
    return (
        <>
            {Object.keys(categoriesMap).map((title) => (
                <div key={title}>
                    <h2 className="category-title">{title}</h2>
                    <div className="products-container">
                        {categoriesMap[title].map((product) => (
                            <div key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    )
}

export default Shop
