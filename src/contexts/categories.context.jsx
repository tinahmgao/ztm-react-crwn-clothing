import { useState, createContext, useEffect } from 'react'

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'

export const CategoriesContext = createContext({
    categoriesMap: {},
})

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({})

    useEffect(() => {
        const getCatetoriesMap = async () => {
            const newCategoriesMap = await getCategoriesAndDocuments()
            setCategoriesMap(newCategoriesMap)
        }
        getCatetoriesMap()
    }, [])

    const value = { categoriesMap }

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}
