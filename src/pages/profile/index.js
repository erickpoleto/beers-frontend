import React, {useEffect, useState} from 'react'
import api from '../../services/api'
import { Link, useHistory } from 'react-router-dom'

import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'

import './styles.css'

import Footer from '../footer'
import NavBar from '../navBar'

export default function Profile() {

  const [filtered, setFiltered] = useState([])
  const [sort, setSort] = useState(1)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [load, setLoading] = useState(false)

  const history = useHistory();
  var search = window.location.search.substring(1).split('&'); 

  const loadItems = async () => {
    if (load) {
      return;
    } 
    try {
      setLoading(true);
      const response = await api.get(`/profile?page=${page}&sort=${sort}&search=${search[0]}`)
      
      setFiltered([...filtered, ...response.data.list])
      setTotal(response.data.total)
      if(response.data.pages == 1){
        setLoading(false);  
        return;
      }
      if(response.data.page == response.data.pages){
        setLoading(false);
        return;
      }
      setPage(page + 1);
    } catch (e) {
      console.info(e)
      alert("not found");
      history.push('/')
    }
  }

  const getOnClickName = (event) => {
    try {
      event.preventDefault();
      history.push(`/about?${event.target.className}`)
    } catch{

    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setPage(1)
    history.push(`/profile?${e.target.querySelector("input").value}`)
    setFiltered([])
  }
  
  useEffect(() =>{
    loadItems();
  }, [sort, filtered]);

  return (
    <div>
      <NavBar search={handleSearch}></NavBar>
      <div className="profile-container">

        <header>
          <h1>{sessionStorage.getItem("@user")}</h1>
        </header>
        <main>
          <h2>Rated</h2>
          <strong>sort by</strong>
          <ul>
            <li className="sortLi"><button onClick={e => {
              if (sort === 1) {
                setSort(-1)
              } else {
                setSort(1)
              }
                setPage(1)
                setFiltered([])
            }} style={{ border: 'none', background: 'none' }}>date</button></li>
          </ul>
          <ul>
            {filtered.map((item) => {
              return (
                <li>
                  <h3>{item.beer.name}</h3>
                  <strong>{item.createdAt}</strong>
                  <img src={item.url}></img>
                  <Rater rating={item.rate} total={5} interactive={false}></Rater>
                  <button onClick={getOnClickName} className={item.beer.name}>More About</button>
                </li>
              )
            })
            }
          </ul>
        </main>
        <Footer></Footer>
      </div>
    </div>
  );
}