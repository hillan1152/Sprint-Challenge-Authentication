import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {axiosWithAuth} from '../auth/axiosWithAuth';



function Register(props){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('/api/auth/register', {username, password})
            .then(res => {
                console.log('register', res)
                localStorage.setItem('token', res.data.payload)
                props.history.push('/protected')
            })
            .catch(err => console.log('registration error', err.response)); 
        }


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                    value={props.username}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    value={props.password}
                />
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register;