// package libraries
import { useState } from 'react'

// components
import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

// functions
import {
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

//styles
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles'

const defaultFormValues = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formValues, setFormValues] = useState(defaultFormValues)
    const { email, password } = formValues

    const resetFormValues = () => {
        setFormValues(defaultFormValues)
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup()
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await signInAuthUserWithEmailAndPassword(email, password)
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
        <SignInContainer>
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
                <ButtonsContainer>
                    <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
                        Sign In
                    </Button>
                    <Button
                        type="button"
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={signInWithGoogle}
                    >
                        Google sign in
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm
