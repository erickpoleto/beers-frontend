import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';
import {login} from '../../services/auth'

import './styles.css'

import Footer from '../footer';

export default function Login (){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        const data = {
            email,
            password
        }
        try{
            const response = await api.post("session/verify", data);
            login(response.data.token);
            sessionStorage.setItem("@user", response.data.user.user)
            alert('success')
            history.push('/');
        }catch(err){
            alert("username or password invalids or your email is not confirmed");
        }
    }

    return(
        <div className="login-container">
            <header>
                <Link to="/" style={{textDecoration:'none', color:'black', opacity:'0.6'}}>BeerS</Link>
            </header>
            <main>
                <h1>Login</h1>
                <h2>Welcome back, Login to your account</h2>
                <div>
                    <form onSubmit={handleLogin}>
                        <input value={email} onChange={e=> setEmail(e.target.value)} type="text" placeholder="Email" required></input>
                        <input value={password} onChange={e=> setPassword(e.target.value)} type="password" placeholder="password" required></input>
                        <button>Login</button>
                    </form>
                    <p>dont have an account? <Link to="/register">register</Link></p>
                    <p>forgot your password? <Link to="/forgotpassword">click here</Link></p>
                </div>    
                
            </main>

            <Footer></Footer>

        </div>
    )
}