import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from '../auth/axiosWithAuth';
import axios from 'axios';

function Jokes(props){
    const [joke, setJoke] = useState([])
    
    useEffect(() => {
        axiosWithAuth()
            .get('/api/jokes', joke)
            .then(res => {
                console.log(res)
                setJoke(res.joke)
            })
            .catch(err => {
                console.log(err)
            })
    })

    return(
        <div>
            {joke.map(item => {
               return <div key={item.id}>{item.joke}</div>
            })}
        </div>
    )
}

export default Jokes;