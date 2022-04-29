// package libraries
import { useState, useContext } from 'react'

// components
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

// functions
import {
    signInWithGooglePopup,
    createUserFromAuth,
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

// Context
import { UserContext } from '../../contexts/user.context'

//styles
import './sign-in-form.styles.scss'

const defaultFormValues = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formValues, setFormValues] = useState(defaultFormValues)
    const { email, password } = formValues

    const { setCurrentUser } = useContext(UserContext)

    const resetFormValues = () => {
        setFormValues(defaultFormValues)
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup()
        await createUserFromAuth(user)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(
                email,
                password
            )
            setCurrentUser(user)
            resetFormValues()
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break
                default:
                    console.log(error)
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormValues({ ...formValues, [name]: value })
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    inputOptions={{
                        type: 'email',
                        required: true,
                        onChange: handleChange,
                        name: 'email',
                        value: email,
                    }}
                />
                <FormInput
                    label="Password"
                    inputOptions={{
                        type: 'password',
                        required: true,
                        onChange: handleChange,
                        name: 'password',
                        value: password,
                    }}
                />
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button
                        type="button"
                        buttonType="google"
                        onClick={signInWithGoogle}
                    >
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm
