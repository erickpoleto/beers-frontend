import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';

import { FaAtom, FaMapMarked, FaMapMarker, FaBlog, FaSignature, FaBook} from 'react-icons/fa'

import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css';

import Footer from '../footer';
import NavBar from '../navBar';
import Map from '../map/map' 
import api from '../../services/api'
import unsplashApi from '../../services/unsPlashApi'

export default function About() {

    const [beer, setBeer] = useState([]);
    const [image, setImage] = useState([]);
    const name = window.location.search.substring(1).split('&');
    const random = Math.floor(Math.random() * 10);

    const history = useHistory();

    const getName = async() => {
        try{
            const response = await api.post(`/about?search=${name[0]}`)
            setBeer(response.data)
            console.info(name[0])
            console.info(response.data)
        }catch(e){
            alert("something went wrong")
        }
    }

    const rate = async (id,rate, url) => {
        try{
            const data = {
                "beer": id.toString(),
                "rate": rate,
                "url": url
            }
            const response = await api.post('/rate', data)
        }catch(e){
            alert("only users can vote");
        }
    }
    const unsPlash = async () => {
        const response = await unsplashApi.get(`search/photos?page=${random}&query=bottle%20of%20beer`)
        
        setImage(response.data.results[random].urls.small)
    }
    const handleSearch = async(e) => {
        e.preventDefault()
        history.push(`/items?&${e.target.querySelector("input").value}`)
    }

    useEffect(() => {
        getName();
        unsPlash();
    }, []);

    return(
        <div><NavBar search={handleSearch}></NavBar>
            <div className="about-container">
                <main>
                        
                        {beer.map( item => {
                            return(
                                <div className="maindiv-container">
                                    
                                    <img src={image}></img>
                                    <div className="maindiv-info">
                                        <h1>{item.name}</h1>
                                        <strong><FaSignature size={20} style={{marginRight:"5px"}}></FaSignature>{item.category}</strong>
                                        <strong><FaMapMarked size={20} style={{marginRight:"5px"}}></FaMapMarked>{item.country}</strong>
                                        <strong><FaMapMarker size={20} style={{marginRight:"5px"}}></FaMapMarker>{item.city}</strong>
                                        <strong><FaAtom size={20} style={{marginRight:"5px"}}></FaAtom> ibu:{item.ibu}</strong>
                                        <strong><FaBlog size={20} style={{marginRight:"5px"}}></FaBlog><a href={item.website}>{item.website}</a></strong>
                                        <Rater onRate={async (rating)=>{await rate(item._id, rating.rating, image)}} rating={item.rate} total={5} interactive={true}></Rater>
                                        <strong><FaBook size={20}></FaBook></strong>
                                        <p>
                                            {item.description}
                                        </p>
                                        <FaMapMarked size={20} style={{marginTop:"5px"}}></FaMapMarked>
                                        <Map lat={item.coordinates[0]} lng={item.coordinates[1]}></Map>
                                    </div>
                                </div>
                                );
                            })
                        }
                </main>
                <Footer></Footer>
            </div>
        </div>
    );
}