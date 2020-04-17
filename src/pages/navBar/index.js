import React, {useState, Component, Fragment} from 'react';
import {FaBars, FaSearch} from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom';

import {logout} from '../../services/auth'
import './styles.css';

export default function NavBar(props) {

    const [search, setSearch] = useState("");
    const history = useHistory()
    
    let username = sessionStorage.getItem('@user')
    let direction = ""
    let route = " ";
    
    if(username == null){
        direction = "login"
        route = '/login'
    }else{
        direction = "profile"
        route = '/profile'
    }
    const showHiddenBar = () => {
        const main = document.querySelector("main");
        main.classList.toggle('main');
        
    }
    const handleLogout = async (e) => {
        e.preventDefault();
        logout()
        sessionStorage.removeItem('@user')
        history.push('')
    }
    return (
        <div className="nav-bar-container">
            <nav className="nav-bar">
                <button onClick={showHiddenBar}>
                    <FaBars size={25} color="black"></FaBars>
                </button>
                <form onSubmit={ props.search }>
                    <input></input>
                    <button type="submit"><FaSearch size={20} color="black">
                    </FaSearch></button>
                </form>
            </nav>
            <main className="main:disabled">
                <ul>
                    <li><strong><Link style={{textDecoration:"none", color:"black"}} to={route}>{direction}</Link></strong></li>
                    <li><strong><Link style={{textDecoration:"none", color:"black"}} to={'/'}>Home</Link></strong></li>
                    <li style={{marginTop:"100px"}}><strong><Link className="logout" onClick={handleLogout}>logout</Link></strong></li>
                </ul>
                
            </main>
        </div>
    );
}
