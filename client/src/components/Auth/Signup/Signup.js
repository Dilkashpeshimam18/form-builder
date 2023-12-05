import React, { useState,} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {


        } catch (err) {
            console.log(err)
            alert(err)
        }
    }

    return (
        <div>
            <div className='login__container'>
                <div className='login__subContainer'>
                    <form onSubmit={handleSignUp} >
                        <h2>SIGN UP</h2>
                        <div className='login__inputContainer'>
                            <h3 className='login__subTitle'>Name</h3>
                            <input className='login__input' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className='login__inputContainer'>
                            <h3 className='login__subTitle'>Email</h3>
                            <input className='login__input' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='login__inputContainer'>
                            <h3 className='login__subTitle'>Password</h3>
                            <input className='login__input' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <Button onClick={handleSignUp} className='login__button' variant="contained">Signup</Button>                    </form>
                    <div className='login__link'>
                        <Link style={{ textDecoration: 'none', color: 'black', fontWeight: 'bolder' }} to='/login'><h3 style={{ cursor: 'pointer', fontSize: '13px' }}>Login with existing account</h3></Link>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default SignUp