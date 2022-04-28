import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils'

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup()
        console.log(
            '🌈 ~ file: sign-in.component.jsx ~ line 6 ~ logGoogleUser ~ response',
            response
        )
    }

    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>Sign In with Google Popup</button>
        </div>
    )
}

export default SignIn
