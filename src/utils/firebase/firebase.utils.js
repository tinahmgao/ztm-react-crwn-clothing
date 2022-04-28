import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyDq0dDevCI-JbX9btboL-NN72kbLDOvdfQ',
    authDomain: 'ztm-react-crwn-clothing-d2ee4.firebaseapp.com',
    projectId: 'ztm-react-crwn-clothing-d2ee4',
    storageBucket: 'ztm-react-crwn-clothing-d2ee4.appspot.com',
    messagingSenderId: '687156207865',
    appId: '1:687156207865:web:82acc0d9dcf32bbc93c228',
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
