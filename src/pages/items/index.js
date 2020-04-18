import React, {useEffect, useState} from 'react';

import { FaAtom, FaMapMarkedAlt, FaWindowRestore} from 'react-icons/fa'
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'


import './styles.css';
import NavBar from '../navBar/index.js';
import Footer from '../footer/index.js';
import api from '../../services/api';
import unsplashApi from '../../services/unsPlashApi';

import { Waypoint } from 'react-waypoint';

import { Link, useHistory } from 'react-router-dom';

export default function Items() {
    
    const [filtered, setFiltered] = useState([])
    const [images, setImages] = useState([])

    const [sortName, setSortName]= useState(1)
    const [sort, setSort]= useState(1)
    var search = window.location.search.substring(1).split('&');
    //paginação
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false)
    
    const history = useHistory();
    
    const loadItems= async()=>{
        
        //document.querySelector(window).height();
        if(loading) {
            return;
        }
        try{ 
            setLoading(true);
            const response = await api.post(`/items?category=${search[0]}&search=${search[1]}&page=${page}&sortName=${sortName}&sort=${sort}`)
            console.info(response.data)
            console.info(response.data.page)
            if(response.data.docs.length === 0){
                alert("nothing found")
                setPage(1)
                history.push(`/items?${search[0]}&`)
                window.location.reload("true")
            }
            unsPlash();
            setFiltered([...filtered, ...response.data.docs])
            setTotal(response.data.total)
            if(response.data.pages == 1){
                 
                return;
            }
            if(response.data.page == response.data.pages){
                  
                return;
            }
            setPage(page + 1);
            setLoading(false);
        }catch(e) {
            console.info(e)
            alert("not found");
            history.push('/')
        }
    }
    const getOnClickName = (event) => {
        try{
            event.preventDefault();
            history.push(`/about?${event.target.className.replace(/#/gi, "")}`)
        }catch{
        }
    }
    const unsPlash = async () => {
        const response = await unsplashApi.get(`search/photos?page=${page}&query=bottle%20of%20beer`)
        const list = []
        response.data.results.map(item => {
            list.push(item.urls.small)
        })
        setImages([...images, ...list])
    }
    const handleSearch = async(e) => {
        e.preventDefault()
        setPage(1)
        history.push(`/items?${search[0]}&${e.target.querySelector("input").value}`)
        setFiltered([])
    }
    
    useEffect(() =>{
        loadItems();
    }, [sort, filtered]);

    return(
        <div>
            <NavBar search={handleSearch}></NavBar>
            <div className="item-container">
                <header>
                    
                    <h1>{search[0].replace(/%20/gi, " ")}</h1>
                    <p>Pale ale is a top-fermented beer made with predominantly pale malt. 
                        The highest proportion of pale malts results in a lighter colour. 
                        The term first appeared around 1703 for 
                        beers made from malts dried with high-carbon coke, which resulted in a lighter colour than other</p>
                    <strong>sort by</strong>
                    <ul>
                        <li><button onClick={e=>{
                            if(sort===1){
                                setSortName("name")
                                setSort(-1)
                            }else{
                                setSortName("name")
                                setSort(1)
                            }
                            setPage(1)
                            setFiltered([])
                        }} style={{border:'none', background:'none'}}>name</button></li>
                        <li><button onClick={e=>{
                            if(sort===1){
                                setSortName("ibu")
                                setSort(-1)
                            }else{
                                setSortName("ibu")
                                setSort(1)
                            }
                            setPage(1)
                            setFiltered([])
                        }} style={{border:'none', background:'none'}}>Ibu</button></li>
                    </ul>
                </header>
                <main>
                    <ul>
                        {filtered.map((item, index) => {
                            return(
                                <li>
                                    <h2>{item.name}</h2>
                                    <span>
                                        <strong>ibu: {item.ibu}</strong>
                                        <FaAtom size={25}></FaAtom>
                                    </span>
                                    <span>
                                        <FaMapMarkedAlt size={25}></FaMapMarkedAlt>
                                        <strong>{item.country}</strong>
                                    </span>
                                    <img src={images[index]}/>
                                    <span style={{alignItems:"center"}}>
                                        <Rater rating={item.rate} total={5} interactive={false}></Rater>
                                        <strong>{Math.round(item.rate).toString().replace(NaN, 0)}</strong>
                                    </span>
                                    <button onClick={getOnClickName} className={item.name.replace("S.A.P.A", "")} style={{textDecoration:'none', color: 'black'}}>
                                        More about
                                    </button>      
                                </li>
                                )
                            })
                        }
                    </ul>
                    <Waypoint onEnter={loadItems}></Waypoint>
                </main>
                <Footer></Footer>
            </div>
        </div>
        
    );
}
