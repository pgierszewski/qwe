import React, { useContext, useState } from 'react'
import { LoginData } from '../src/auth/types'
import AuthManager from '../src/auth/authManager'

const Login: React.FC = () => {
    const initialState = {
        username: '',
        password: ''
    }

    const [formData, setFormData] = useState<LoginData>(initialState)
    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        })
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        AuthManager.login(formData).then(() => window.location.reload())
    }

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>): void => {
        AuthManager.logout().then(() => window.location.reload())
    }

    const handleRefresh = (e: React.MouseEvent<HTMLButtonElement>): void => {
        AuthManager.refreshToken().then(() => window.location.reload())
    }

    return (
        <div>
            Login:
                <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor='name'>username</label>
                    <input onChange={handleForm} type='text' id='username' />
                </div>
                <div>
                    <label htmlFor='description'>password</label>
                    <input onChange={handleForm} type='password' id='password' />
                </div>
                <button>login</button>
            </form>
            <button onClick={handleRefresh}>refresh</button>
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Login