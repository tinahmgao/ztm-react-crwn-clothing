import { createContext, useState, useEffect } from 'react'

import {
    onAuthStateChangedListener,
    createUserFromAuth,
} from '../utils/firebase/firebase.utils'

// storage
export const UserContext = createContext({
    //default value
    currentUser: null,
    setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const value = { currentUser, setCurrentUser }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserFromAuth(user)
            }
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
