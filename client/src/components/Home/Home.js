import React from 'react'
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
    return (
        <div>      <h1>Form Builder</h1>
            <Link to='/create-form'>
                <Button className='login__button' variant="contained">Create Form</Button>
            </Link>

        </div>
    )
}

export default Home