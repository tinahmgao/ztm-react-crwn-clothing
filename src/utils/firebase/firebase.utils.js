import { async } from '@firebase/util'
import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyDq0dDevCI-JbX9btboL-NN72kbLDOvdfQ',
    authDomain: 'ztm-react-crwn-clothing-d2ee4.firebaseapp.com',
    projectId: 'ztm-react-crwn-clothing-d2ee4',
    storageBucket: 'ztm-react-crwn-clothing-d2ee4.appspot.com',
    messagingSenderId: '687156207865',
    appId: '1:687156207865:web:82acc0d9dcf32bbc93c228',
}

// connect to firebase project
const firebaseApp = initializeApp(firebaseConfig)

const googleAuthProvider = new GoogleAuthProvider()
googleAuthProvider.setCustomParameters({
    prompt: 'select_account',
})

// auth
export const auth = getAuth()

// google auth
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleAuthProvider)
export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleAuthProvider)

// firestore db
export const db = getFirestore()

// create user
export const createUserFromAuth = async (authUser, additionalInfo) => {
    if (!authUser) return
    const userDocRef = doc(db, 'users', authUser.uid)
    const userSnapshot = await getDoc(userDocRef)

    //if user exist -> return userDocRef
    //if user doesn't exist -> create user to db

    if (!userSnapshot.exists()) {
        const { displayName, email } = authUser
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo,
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef
}

// user + password auth

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password)
}
