// package libraries
import { useState } from 'react'

// components
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

// functions
import {
    signInWithGooglePopup,
    createUserFromAuth,
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

//styles
import './sign-in-form.styles.scss'

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
        const { user } = await signInWithGooglePopup()
        const userDocRef = await createUserFromAuth(user)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await signInAuthUserWithEmailAndPassword(
                email,
                password
            )
            console.log(response)
            resetFormValues()
        } catch (error) {}
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
                    <Button buttonType="google" onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm
