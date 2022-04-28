import { useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'

import {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserFromAuth,
} from '../../utils/firebase/firebase.utils'

const SignIn = () => {
    useEffect(() => {
        const redirectResult = async () => {
            const response = await getRedirectResult(auth)

            if (response) {
                const userDocRef = await createUserFromAuth(response.user)
            }
        }
        redirectResult()
    }, [])

    const logGooglePopup = async () => {
        const { user } = await signInWithGooglePopup()
        const userDocRef = await createUserFromAuth(user)
    }

    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGooglePopup}>Sign In with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>
                Sign In with Google Redirect
            </button>
        </div>
    )
}

export default SignIn
