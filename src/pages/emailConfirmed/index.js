import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Footer from '../footer/index'

import api from '../../services/api';
import './styles.css';
export default function ConfirmedEmail(){

    const info = window.location.search.substring(1).split('&');
    const history = useHistory()
    
    const confirm = async() => {
        try{
            const response = await api.post(`confirm?token=${info[0]}&email=${info[1]}`) 
            console.info("email confirmed")
        }catch(e){
            console.info(e);
            return alert('invalid email')
        }
    }
    useEffect(() =>{
        confirm();   
    }, []);
    return(
        <div className="emailconfirmed-container">
                <header>
                    <Link to="/" style={{textDecoration:'none', color:'black', opacity:'0.6'}}>BeerS</Link>
                </header>
                <main>
                    <h1>Email confirmed</h1>
                    <h2><Link to='/login'>click here to login and enjoy!</Link></h2>
                    
                </main>

                <Footer></Footer>

        </div>
    )
}