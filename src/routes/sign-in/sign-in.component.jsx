import {
    signInWithGooglePopup,
    createUserFromAuth,
} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {
    const logGooglePopup = async () => {
        const { user } = await signInWithGooglePopup()
        const userDocRef = await createUserFromAuth(user)
    }

    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGooglePopup}>Sign In with Google Popup</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn
