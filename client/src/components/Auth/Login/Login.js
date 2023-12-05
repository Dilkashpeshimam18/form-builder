import React, { useState} from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
       
        } catch (err) {
            console.log(err)
            alert(err.response.data)
        }
    }
   
    return (
        <div className='login'>
            <div className='login__container'>
                <div className='login__subContainer'>
                    <form onSubmit={handleLogin} >

                        <h2>Login</h2>
                        <div className='login__inputContainer'>
                            <h3 className='login__subTitle'>Email</h3>
                            <input className='login__input' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='login__inputContainer'>
                            <h3 className='login__subTitle'>Password</h3>
                            <input className='login__input' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <Button onClick={handleLogin} className='login__button'  variant="contained">Login</Button>                    </form>
                    <div className='login__link'>
                        <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder' }} to='/sign-up'> <h3 style={{ cursor: 'pointer', fontSize: '13px', textDecoration: 'none' }}>Create new account?</h3></Link>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login