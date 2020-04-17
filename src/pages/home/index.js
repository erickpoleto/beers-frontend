import React, {useEffect, useState} from 'react';
import {FaSearch, FaPlusCircle, FaFacebookF, FaUser} from 'react-icons/fa'

import unsplashApi from'../../services/unsPlashApi'
import './styles.css'
import Footer from '../footer/index.js'

import { Link, useHistory } from 'react-router-dom';
import { getCategories} from '../../services/functionsJson.js'
import Login from '../login';


export default function Home() { 

    
    const [categories, setCategories] = useState([]);
    const [images, setImages] = useState([0]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState("");
    const history = useHistory();
    let username = sessionStorage.getItem('@user')
    let log = ""
    let route = " ";
    if(username == null){
        log = "login"
        route = '/login'
    }else{
        log = "profile"
        route = '/profile'
    }
    
    useEffect(() => {
        unsPlash()
        setCategories(getCategories);
    }, []);

    const unsPlash = async () => {
        const response = await unsplashApi.get("search/photos?query=beer")
        const list = []
        response.data.results.map(item => {
            list.push(item.urls.small)
        })
        setImages(list)
    }

    const consult = async (e) => {
        try{
            //sessionStorage.setItem('@search', search)
            await history.push(`/items?${category}&${search}`)
        }catch(err){
            console.info(err)
            alert('something went wrong, try again')
        }
    }
    return(
        <div className="home-container">
            <header>
                <div>
                    <span>
                        <Link to={route} style={{textDecoration:'none'}}>
                        <strong style={{marginRight:"15px"}}>{log}</strong>
                        <FaUser size={30} color='white'></FaUser>
                        </Link>
                    </span>
                    <h1>BeerS</h1>
                    <strong>Find any beer you want</strong>
                    <form onSubmit={consult}>
                        <input value={search} onChange={e => setSearch(e.target.value)} type='text' placeholder="Search"></input>
                        <button type="submit">
                            <FaSearch size={20} color="#000"></FaSearch>
                        </button>
                    </form>
                </div>
            </header>
            <main>
                <h2>Categories</h2>
                <ul>
                    {categories.map((item, index) =>             
                        <li style={{backgroundImage:"url(" + images[index] + ")"}}>    
                            <div>
                                <strong>{item.category}</strong>
                                <p>strong, good, and beauty</p>
                                <form onSubmit={consult}> 
                                    <button type="submit" onClick={async e=> await setCategory(item.category)}>
                                        <FaPlusCircle size={40} color="white"></FaPlusCircle>
                                    </button>    
                                </form>
                            </div>
                        </li>
                        )
                    }  
                </ul>
            </main>
            <Footer></Footer>
        </div>
    );
}

 