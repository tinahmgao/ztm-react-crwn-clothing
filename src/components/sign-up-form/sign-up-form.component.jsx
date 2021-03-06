import { useState } from 'react'

import FormInput from '../form-input/form-input.component'
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component'

import {
    createAuthUserWithEmailAndPassword,
    createUserFromAuth,
} from '../../utils/firebase/firebase.utils'

import { SignUpContainer } from './sign-up-form.styles'

const defaultFormValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formValues, setFormValues] = useState(defaultFormValues)

    const { displayName, email, password, confirmPassword } = formValues

    const resetFormValues = () => {
        setFormValues(defaultFormValues)
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            alert('passwords do not match')
            return
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            )
            await createUserFromAuth(user, { displayName })
            resetFormValues()
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use')
            } else {
                console.log('user creation encountered an error', error)
            }
        }
    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    inputOptions={{
                        type: 'text',
                        required: true,
                        onChange: handleChange,
                        name: 'displayName',
                        value: displayName,
                    }}
                />
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
                <FormInput
                    label="Confirm Password"
                    inputOptions={{
                        type: 'password',
                        required: true,
                        onChange: handleChange,
                        name: 'confirmPassword',
                        value: confirmPassword,
                    }}
                />
                <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
                    Sign Up
                </Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm
