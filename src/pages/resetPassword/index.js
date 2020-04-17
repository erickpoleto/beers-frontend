import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Footer from '../footer/index'

import api from '../../services/api';
import './styles.css'
export default function ResetPassword(){

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const info = window.location.search.substring(1).split('&');

    const history = useHistory()
    const reset = async (e) => {
        e.preventDefault();
        try{
            if(/\s/g.test(password)){
                alert("password cant have white spaces")
                return;
            }
            else if(confirmPassword !== password){
                alert("passwords are different")
                return;
            }
            const data = {
                password
            }
            const response = await api.post(`session/resetPassword?token=${info[0]}&email=${info[1]}`, data) 
            alert('password changed')
            history.push('/login')
        }catch(e){
            console.info(e);
            return alert('invalid email')
        }
    }
    return(
        <div className="forgotpassword-container">
                <header>
                    <Link to="/" style={{textDecoration:'none', color:'black', opacity:'0.6'}}>BeerS</Link>
                </header>
                <main>
                    <h1>Reset your password</h1>
                    <h2>Enter new password</h2>
                    <div>
                        <form onSubmit={reset}>
                            <input value={password} onChange={e=> setPassword(e.target.value)} type="password" placeholder="new password" required></input>
                            <input value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)} type="password" placeholder="confirm password" required></input>
                            <button>Send</button>
                        </form>
                    </div>    
                    
                </main>

                <Footer></Footer>

        </div>
    )
}