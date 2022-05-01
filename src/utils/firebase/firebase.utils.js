import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore'

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

// create collection and insert data based on js object once
export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit()
    console.log('done')
}

//get collection data
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)

    //returen an hashtable
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data()
        acc[title.toLowerCase()] = items
        return acc
    }, {})

    return categoryMap
}

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

// auth with email + passowrd

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password)
}

// sign in with email + password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return await signInWithEmailAndPassword(auth, email, password)
}

// sign out
export const signOutUser = async () => await signOut(auth)

// observer
export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback)

// next : callback, error: errorCallback, complete: completeCallback
