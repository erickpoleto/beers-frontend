import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Footer from '../footer/index'

import api from '../../services/api';
import './styles.css'
export default function ForgotPassword(){

    const [email, setEmail] = useState("")

    const forgoted = async (e) => {
        e.preventDefault();
        try{
            const response = await api.post('session/forgotPassword', {email}) 
            alert('check you mail box')
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
                    <h1>Forgot your password?</h1>
                    <h2>Enter the email addres registered to your account and <b>check</b> your mail box</h2>
                    <div>
                        <form onSubmit={forgoted}>
                            <input value={email} onChange={e=> setEmail(e.target.value)} type="text" placeholder="Email" required></input>
                            <button>Send</button>
                        </form>
                    </div>    
                    
                </main>

                <Footer></Footer>

        </div>
    )
}