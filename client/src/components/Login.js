import React, {useState, useEffect } from 'react';
import axios from 'axios';
import {axiosWithAuth} from '../auth/axiosWithAuth';



function Login(props){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('/api/auth/login', {username, password})
            .then(res => {
                console.log('login', res)
                localStorage.setItem('token', res.data.payload)
                props.history.push('/protected')
            })
            .catch(err => console.log('login error', err.response)); 
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
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login;