import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker } from "react-map-gl";

import {FaMapMarkerAlt} from 'react-icons/fa'


export default function Map(props){
    const [viewport, setViewport] = useState({});
    
    useEffect(() => {
    
            
        const data = {
            latitude: props.lat,
            longitude: props.lng,
            width: "100%",
            height: "300px",
            zoom: 15
        }
        setViewport(data)
      
    }, [])
        
    return( 
        <div style={{width:"100%", height: "300px", marginTop:"20px"}}>
            <ReactMapGL {...viewport} 
                mapboxApiAccessToken={"pk.eyJ1IjoiZXJpY2twb2xldG8iLCJhIjoiY2s5NGl2MmVkMDFyZTNlbTI5cGtneHJ5YSJ9.fu-9nal4eJsdjmqQdAikBA"}
                onViewportChange= {viewport => {
                        setViewport(viewport);
                    }}
                mapStyle="mapbox://styles/erickpoleto/ck94j693m45re1imn6fecpfek"
            >
                <Marker latitude={props.lat} longitude={props.lng}><div><FaMapMarkerAlt size={25} color="red"></FaMapMarkerAlt></div></Marker>
            </ReactMapGL>            
        </div>
    )
}