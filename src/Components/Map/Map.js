import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import './Map.css';

function Map({ handlechildclick, coords, setCoords, setBounds, places }) {
    
    console.log(coords)
    return (
        <div className="mapcontainer">
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDsHoDq_LYAhvHhOuGa8vtXEHpqf0yiiQM' }}
                defaultCenter={coords}
                center={coords}
                defaultZoom={10}
                margin={[50, 50, 50, 50]}
                options={{ disableDefaultUI: true, zoomControl: true }}
                onChange={(e) => {
                    console.log("lat ",e.center.lat)
                    console.log("lng ",e.center.lng)
                setCoords({ lat: e.center.lat, lng: e.center.lng });
                setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                
                }}
                onChildClick={(child) => handlechildclick(Number(child))}
            >
                {places ? (places.length && places.map((place, i) => (
                    <Marker lat={Number(place.latitude)} lng={Number(place.longitude)} place={place} key={i} />
                ))) : ('') }

                
            </GoogleMapReact>
        </div>
    )
}

const Marker = ({ place }) => {
    return (
        <div className="pointer markerContainer"> 
           
            <div className="markername">
                <img className="imgmap" src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} /> 
                <p className="markertext">{place.name}</p>
            </div>
            <LocationOnOutlinedIcon color="secondary" fontSize="large" />
        </div>
        
      )
}

export default Map
